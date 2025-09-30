import { NextResponse } from 'next/server'
import { downloadFile } from '@/lib/gdrive'

/**
 * Serves a Google Drive file stream, handling range requests, CORS, content disposition, caching, and ETag.
 *
 * Validates the required `fileId` query parameter, optionally treats the `download` query parameter ('1' or 'true') as a request
 * to force an attachment Content-Disposition, and forwards the file stream returned by the storage layer with appropriate
 * response headers (Content-Type, Accept-Ranges, Cache-Control, CORS headers, Content-Length/Content-Range, ETag). Ensures
 * audio MIME types are streamed with byte-range support and removes transfer-encoding when appropriate.
 *
 * @returns A Response containing the file stream with appropriate headers (206 for range requests, 200 otherwise).
 *          On validation failure returns a JSON error response with status 400. On retrieval errors returns a JSON error
 *          response with status 500.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');
  const wantDownload = searchParams.get('download') === '1' || searchParams.get('download') === 'true';
  if (!fileId || typeof fileId !== 'string' || fileId.length < 5) {
    console.error('[gdrive-file] Missing or invalid fileId', { fileId });
    return NextResponse.json({ error: 'Missing or invalid fileId' }, { status: 400 });
  }

  const range = request.headers.get('range') || undefined;

  try {
    const metadata = await import('@/lib/gdrive').then(mod => mod.getFileMetadata(fileId));
    const mimeType = metadata?.mimeType || 'application/octet-stream';
    const { stream, headers } = await downloadFile(fileId, range);
    const resHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
      if (typeof value === 'string') resHeaders[key] = value;
      else if (Array.isArray(value)) resHeaders[key] = value.join(', ');
    }
    
    resHeaders['Content-Type'] = mimeType;
    resHeaders['Accept-Ranges'] = 'bytes';
    resHeaders['Cache-Control'] = 'public, max-age=3600';
    
    resHeaders['Access-Control-Allow-Origin'] = '*';
    resHeaders['Access-Control-Allow-Methods'] = 'GET, HEAD, OPTIONS';
    resHeaders['Access-Control-Allow-Headers'] = 'Range, Content-Range, Content-Length, Content-Type';
    resHeaders['Access-Control-Expose-Headers'] = 'Accept-Ranges, Content-Length, Content-Range, ETag, Content-Type';
    resHeaders['Vary'] = 'Origin, Range';
    
    if (metadata?.name) {
      const disposition = wantDownload ? 'attachment' : 'inline';
      resHeaders['Content-Disposition'] = `${disposition}; filename="${metadata.name}"`;
    }
    
    if (!resHeaders['Content-Length'] && !resHeaders['Content-Range'] && metadata?.size) {
      resHeaders['Content-Length'] = String(metadata.size);
    }
    
    const gEtag = headers['etag'] as any;
    const m = metadata as any;
    if (gEtag) resHeaders['ETag'] = String(gEtag);
    else if (m?.md5Checksum) resHeaders['ETag'] = `W/"md5-${m.md5Checksum}-${m.size}-${m.modifiedTime}"`;
    
    if (mimeType.startsWith('audio/')) {
      resHeaders['Accept-Ranges'] = 'bytes';
      resHeaders['Content-Type'] = mimeType;
      delete resHeaders['transfer-encoding'];
    }
    
    const status = range ? 206 : 200;
    return new Response(stream as any, {
      status,
      headers: resHeaders,
    });
  } catch (error) {
    const message = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error);
    console.error('[gdrive-file] Download error', { fileId, error: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Provide headers describing a file identified by `fileId` for a HEAD request.
 *
 * The response includes content negotiation and CORS headers (e.g. `Content-Type`, `Accept-Ranges`,
 * `Access-Control-*`, `Vary`). If the file metadata contains `size`, `Content-Length` is set.
 * If `md5Checksum` is present, an `ETag` is set using the format `W/"md5-{md5Checksum}-{size}-{modifiedTime}"`.
 *
 * @returns A Response containing the file headers on success (status 200); a 400 Response if `fileId` is missing; a 404 Response if metadata cannot be retrieved.
 */
export async function HEAD(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');
  if (!fileId) return new Response(null, { status: 400 });
  try {
    const metadata = await import('@/lib/gdrive').then(mod => mod.getFileMetadata(fileId));
    const headers: Record<string, string> = {
      'Accept-Ranges': 'bytes',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Range, Content-Length, Content-Type',
      'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Length, Content-Range, ETag, Content-Type',
      'Content-Type': metadata?.mimeType || 'application/octet-stream',
      'Vary': 'Origin, Range',
    };
    if (metadata?.size) headers['Content-Length'] = String(metadata.size);
    const m: any = metadata;
    if (m?.md5Checksum) headers['ETag'] = `W/"md5-${m.md5Checksum}-${m.size}-${m.modifiedTime}"`;
    return new Response(null, { status: 200, headers });
  } catch {
    return new Response(null, { status: 404 });
  }
}

/**
 * Responds to CORS preflight requests with standard Access-Control-* headers.
 *
 * @returns A Response with status 200 and headers:
 * - Access-Control-Allow-Origin: '*'
 * - Access-Control-Allow-Methods: 'GET, HEAD, OPTIONS'
 * - Access-Control-Allow-Headers: 'Range, Content-Range, Content-Length, Content-Type'
 * - Access-Control-Expose-Headers: 'Accept-Ranges, Content-Length, Content-Range, ETag, Content-Type'
 * - Access-Control-Max-Age: '86400'
 */
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Range, Content-Length, Content-Type',
      'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Length, Content-Range, ETag, Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
