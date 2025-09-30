import { NextResponse } from 'next/server'
import { downloadFile, getFileMetadata, verifyDownloadToken } from '@/lib/gdrive'
import { nodeToWebStream } from '@/lib/node-to-web-stream'

/**
 * Handle authenticated Google Drive file download requests, supporting byte-range requests.
 *
 * On success returns a Response streaming the file with headers such as Content-Type, Content-Disposition,
 * Accept-Ranges, Cache-Control, CORS headers, Content-Length or Content-Range when available, and an ETag when computable.
 * Responds with 206 when a range is supplied by the client (and a Content-Range is provided by upstream), otherwise 200.
 * If required query parameters are missing, the token is invalid/expired, or an internal error occurs, returns a JSON error response with status 400, 403, or 500 respectively.
 *
 * @returns A Response containing the file stream and download-related headers on success; otherwise a JSON NextResponse with an error message and an appropriate HTTP status (400, 403, or 500).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');
  const expiry = searchParams.get('expiry');
  const token = searchParams.get('token');
  const userIp = request.headers.get('x-forwarded-for') || undefined;
  const range = request.headers.get('range') || undefined;

  if (!fileId || !expiry || !token) {
    console.error('[gdrive-download] Missing fileId, expiry, or token', { fileId, expiry, token, userIp });
    return NextResponse.json({ error: 'Missing fileId, expiry, or token' }, { status: 400 });
  }

  if (!verifyDownloadToken(fileId, Number(expiry), token, userIp)) {
    console.warn('[gdrive-download] Invalid or expired token', { fileId, expiry, token, userIp });
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
  }

  try {
    const metadata = await getFileMetadata(fileId);
    const { stream, headers: gdriveHeaders } = await downloadFile(fileId, range);
    const webStream = nodeToWebStream(stream);
    const responseHeaders: Record<string, string> = {
      'Content-Type': gdriveHeaders['content-type'] || metadata.mimeType || 'application/octet-stream',
      'Content-Disposition': `inline; filename="${metadata.name}"`,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Length, Content-Range, ETag',
      'Vary': 'Origin, Range',
    };
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
    console.log('[gdrive-download] Response headers:', responseHeaders);
    return new Response(webStream, {
      status: gdriveHeaders['content-range'] ? 206 : 200,
      headers: responseHeaders,
    });
  } catch (error) {
    const message = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error);
    console.error('[gdrive-download] Download error', {
      fileId,
      expiry,
      token,
      userIp,
      range,
      error: message,
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Produce HTTP headers describing a file (size, type and caching) for a HEAD request without a response body.
 *
 * @returns A Response with file metadata headers:
 * - 200 and headers (Accept-Ranges, Content-Type, Cache-Control, optionally Content-Length and a weak ETag) when the file is found;
 * - 400 when the `fileId` query parameter is missing;
 * - 404 when metadata cannot be retrieved.
 */
export async function HEAD(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');
  if (!fileId) return new Response(null, { status: 400 });
  try {
    const metadata = await getFileMetadata(fileId);
    const headers: Record<string, string> = {
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Length, Content-Range, ETag',
      'Content-Type': metadata.mimeType || 'application/octet-stream',
      'Vary': 'Origin, Range',
    };
    if (metadata.size) headers['Content-Length'] = String(metadata.size);
    if (metadata.md5Checksum) headers['ETag'] = `W/"md5-${metadata.md5Checksum}-${metadata.size}-${metadata.modifiedTime}"`;
    return new Response(null, { status: 200, headers });
  } catch {
    return new Response(null, { status: 404 });
  }
}
