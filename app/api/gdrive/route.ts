import { NextResponse } from 'next/server'
import { 
  listFilesInFolder, 
  searchFilesInDrive, 
  downloadFile, 
  getFileMetadata, 
  verifyDownloadToken 
} from '@/lib/gdrive'
import { getDriveBySlug } from '@/lib/drives-config'
import { getAuthenticatedDrive } from '@/lib/auth-utils'
import { nodeToWebStream } from '@/lib/node-to-web-stream'
import {
  validateFileId,
  validateFolderId,
  validateQuery,
  validatePageSize,
  createCorsHeaders,
  createSecurityHeaders,
  getCacheHeaders,
  handleApiError,
  validateRequest,
  checkRateLimit,
  logRequest,
  createFileHeaders,
  type DriveApiRequest,
  type ApiResponse,
  type FileMetadata
} from '@/lib/drive-utils'

const ROOT_FOLDER_ID = process.env.ROOT_FOLDER_ID

export async function GET(request: Request) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'list';
    const driveSlug = searchParams.get('driveSlug');
    
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!checkRateLimit(clientIp)) {
      console.warn('🚫 Rate limit exceeded for IP:', clientIp);
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    
    console.log('📁 GDrive API request:', { action, driveSlug });

    switch (action) {
      case 'list':
        return await handleListFiles(request, startTime, driveSlug || undefined);
      case 'search':
        return await handleSearchFiles(request, startTime);
      case 'stream':
        return await handleStreamFile(request, startTime);
      case 'download':
        return await handleSecureDownload(request, startTime);
      default:
        return NextResponse.json({ error: 'Invalid action. Use: list, search, stream, download' }, { status: 400 });
    }
  } catch (error) {
    const errorResult = handleApiError(error, 'GDrive API');
    logRequest('error', { error: errorResult.error }, startTime);
    return NextResponse.json({ error: errorResult.error }, { status: errorResult.status });
  }
}

export async function HEAD(request: Request) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'stream';
    const fileId = searchParams.get('fileId');
    
    if (!fileId) {
      return new Response(null, { status: 400 });
    }

    if (!validateFileId(fileId)) {
      return new Response(null, { status: 400 });
    }

    if (action === 'stream' || action === 'download') {
      const metadata = await getFileMetadata(fileId);
      const headers: Record<string, string> = {
        'Accept-Ranges': 'bytes',
        ...createCorsHeaders(),
        'Content-Type': metadata?.mimeType || 'application/octet-stream',
        'Vary': 'Origin, Range',
        'Cache-Control': 'public, max-age=3600',
      };
      
      if (metadata?.size) headers['Content-Length'] = String(metadata.size);
      const m: any = metadata;
      if (m?.md5Checksum) headers['ETag'] = `W/"md5-${m.md5Checksum}-${m.size}-${m.modifiedTime}"`;
      
      return new Response(null, { status: 200, headers });
    }

    return new Response(null, { status: 404 });
  } catch (error) {
    const errorResult = handleApiError(error, 'GDrive HEAD');
    logRequest('head_error', { error: errorResult.error }, startTime);
    return new Response(null, { status: errorResult.status });
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      ...createCorsHeaders(),
      'Access-Control-Max-Age': '86400',
    },
  });
}

async function handleListFiles(request: Request, startTime: number, driveSlug?: string) {
  try {
    const { searchParams } = new URL(request.url);
    const folderParam = searchParams.get('folderId');
    const pageToken = searchParams.get('pageToken') || undefined;
    const pageSizeParam = searchParams.get('pageSize');
    const pageSize = Math.max(1, Math.min(200, pageSizeParam ? parseInt(pageSizeParam) : 100));

    if (!validatePageSize(pageSize)) {
      return NextResponse.json({ error: 'Invalid page size. Must be between 1 and 200' }, { status: 400 });
    }

    let folderId = folderParam;
    let rootFolderId = ROOT_FOLDER_ID;

    if (driveSlug) {
      const drive = getDriveBySlug(driveSlug);
      if (!drive) {
        console.log('❌ Drive not found:', driveSlug);
        return NextResponse.json({ error: 'Drive not found' }, { status: 404 });
      }

      console.log('✅ Drive found:', { name: drive.name, requiresPassword: drive.requiresPassword });

      if (drive.requiresPassword) {
        const authenticatedDrive = await getAuthenticatedDrive();
        if (!authenticatedDrive || authenticatedDrive !== driveSlug) {
          console.log('❌ Authentication required for drive:', driveSlug);
          return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }
        console.log('✅ Authentication verified for drive:', driveSlug);
      }

      rootFolderId = drive.rootFolderId;
      folderId = folderParam || rootFolderId;
    } else {
      const publicDrive = getDriveBySlug('public');
      if (publicDrive) {
        rootFolderId = publicDrive.rootFolderId;
        folderId = folderParam || rootFolderId;
      } else {
        folderId = folderParam || ROOT_FOLDER_ID || null;
      }
    }

    if (folderId && !validateFolderId(folderId)) {
      return NextResponse.json({ error: 'Invalid folder ID format' }, { status: 400 });
    }

    if (!folderId || typeof folderId !== 'string' || folderId.length < 5) {
      if (!folderParam && !rootFolderId) {
        console.error('No root folder ID available');
        return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
      }
      console.error('Missing or invalid folderId', { folderId });
      return NextResponse.json({ error: 'Missing or invalid folderId' }, { status: 400 });
    }

    console.log('📂 Listing files in folder:', { folderId, pageSize });
    const { files, nextPageToken } = await listFilesInFolder(folderId, pageToken, pageSize);
    
    console.log('📁 Files retrieved from Google Drive:', { 
      count: files?.length || 0, 
      hasNextPage: !!nextPageToken,
      firstFile: files?.[0]?.name || 'none'
    });
    
    const response = {
      files,
      nextPageToken
    };
    
    logRequest('list', { driveSlug, folderId, pageSize, count: files?.length || 0 }, startTime);
    return NextResponse.json(response);
  } catch (error) {
    const errorResult = handleApiError(error, 'List Files');
    logRequest('list_error', { error: errorResult.error }, startTime);
    return NextResponse.json({ error: errorResult.error }, { status: errorResult.status });
  }
}

async function handleSearchFiles(request: Request, startTime: number) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const pageToken = searchParams.get('pageToken') || undefined;
    const pageSizeParam = searchParams.get('pageSize');
    const pageSize = pageSizeParam ? parseInt(pageSizeParam) : 100;

    if (!validateQuery(query)) {
      return NextResponse.json({ error: 'Invalid query. Must be 1-100 characters' }, { status: 400 });
    }

    if (!validatePageSize(pageSize)) {
      return NextResponse.json({ error: 'Invalid page size. Must be between 1 and 200' }, { status: 400 });
    }

    console.log('🔍 Searching files:', { query, pageSize });
    const { files, nextPageToken } = await searchFilesInDrive(query, pageToken, pageSize);
    
    const response = {
      files,
      nextPageToken
    };
    
    logRequest('search', { query, pageSize, count: files?.length || 0 }, startTime);
    return NextResponse.json(response);
  } catch (error) {
    const errorResult = handleApiError(error, 'Search Files');
    logRequest('search_error', { error: errorResult.error }, startTime);
    return NextResponse.json({ error: errorResult.error }, { status: errorResult.status });
  }
}

async function handleStreamFile(request: Request, startTime: number) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');
    const wantDownload = searchParams.get('download') === '1' || searchParams.get('download') === 'true';
    
    if (!fileId || typeof fileId !== 'string' || fileId.length < 5) {
      console.error('Missing or invalid fileId', { fileId });
      return NextResponse.json({ error: 'Missing or invalid fileId' }, { status: 400 });
    }

    if (!validateFileId(fileId)) {
      return NextResponse.json({ error: 'Invalid file ID format' }, { status: 400 });
    }

    const range = request.headers.get('range') || undefined;

    console.log('Streaming file:', { fileId, wantDownload });
    const metadata = await getFileMetadata(fileId);
    const mimeType = metadata?.mimeType || 'application/octet-stream';
    const { stream, headers } = await downloadFile(fileId, range);
    
    const resHeaders = createFileHeaders(metadata, {
      mimeType,
      wantDownload,
      range
    });
    
    for (const [key, value] of Object.entries(headers)) {
      if (typeof value === 'string') resHeaders[key] = value;
      else if (Array.isArray(value)) resHeaders[key] = value.join(', ');
    }
    
    if (!resHeaders['Content-Length'] && !resHeaders['Content-Range'] && metadata?.size) {
      resHeaders['Content-Length'] = String(metadata.size);
    }
    
    const gEtag = headers['etag'] as any;
    const m = metadata as any;
    if (gEtag) resHeaders['ETag'] = String(gEtag);
    else if (m?.md5Checksum) resHeaders['ETag'] = `W/"md5-${m.md5Checksum}-${m.size}-${m.modifiedTime}"`;
    
    const status = range ? 206 : 200;
    logRequest('stream', { fileId, mimeType, status, wantDownload }, startTime);
    
    return new Response(stream as any, {
      status,
      headers: resHeaders,
    });
  } catch (error) {
    const errorResult = handleApiError(error, 'Stream File');
    logRequest('stream_error', { error: errorResult.error }, startTime);
    return NextResponse.json({ error: errorResult.error }, { status: errorResult.status });
  }
}

async function handleSecureDownload(request: Request, startTime: number) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');
    const expiry = searchParams.get('expiry');
    const token = searchParams.get('token');
    const userIp = request.headers.get('x-forwarded-for') || undefined;
    const range = request.headers.get('range') || undefined;

    const missingParams = validateRequest(request, ['fileId', 'expiry', 'token']);
    if (missingParams.length > 0) {
      return NextResponse.json({ 
        error: `Missing required parameters: ${missingParams.join(', ')}` 
      }, { status: 400 });
    }

    if (!validateFileId(fileId!)) {
      return NextResponse.json({ error: 'Invalid file ID format' }, { status: 400 });
    }

    if (!verifyDownloadToken(fileId!, Number(expiry), token!, userIp)) {
      console.warn('🚫 Invalid or expired token', { fileId, expiry, token, userIp });
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
    }

    console.log('🔒 Secure download:', { fileId, userIp });
    const metadata = await getFileMetadata(fileId!);
    const { stream, headers: gdriveHeaders } = await downloadFile(fileId!, range);
    const webStream = nodeToWebStream(stream);
    
    const responseHeaders = createFileHeaders(metadata, {
      mimeType: gdriveHeaders['content-type'] || metadata.mimeType || undefined,
      isSecure: true
    });
    
    if (gdriveHeaders['content-range']) {
      responseHeaders['Content-Range'] = gdriveHeaders['content-range'];
    }
    if (gdriveHeaders['content-length']) {
      responseHeaders['Content-Length'] = gdriveHeaders['content-length'];
    } else if (!gdriveHeaders['content-range'] && metadata.size) {
      responseHeaders['Content-Length'] = String(metadata.size);
    }
    
    responseHeaders['ETag'] = (gdriveHeaders['etag'] as string) ||
      (metadata.md5Checksum ? `W/"md5-${metadata.md5Checksum}-${metadata.size}-${metadata.modifiedTime}"` : undefined) || '';
    if (!responseHeaders['ETag']) delete responseHeaders['ETag'];
    
    logRequest('download', { fileId, userIp, headers: Object.keys(responseHeaders) }, startTime);
    
    return new Response(webStream, {
      status: gdriveHeaders['content-range'] ? 206 : 200,
      headers: responseHeaders,
    });
  } catch (error) {
    const errorResult = handleApiError(error, 'Secure Download');
    logRequest('download_error', { error: errorResult.error }, startTime);
    return NextResponse.json({ error: errorResult.error }, { status: errorResult.status });
  }
}