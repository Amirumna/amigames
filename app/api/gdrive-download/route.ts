import { NextResponse } from 'next/server'
import { downloadFile, getFileMetadata, verifyDownloadToken } from '@/lib/gdrive'
import { nodeToWebStream } from '@/lib/node-to-web-stream'

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
    };
    if (gdriveHeaders['content-range']) {
      responseHeaders['Content-Range'] = gdriveHeaders['content-range'];
    }
    if (gdriveHeaders['content-length']) {
      responseHeaders['Content-Length'] = gdriveHeaders['content-length'];
    }
    if (gdriveHeaders['etag']) {
      responseHeaders['ETag'] = gdriveHeaders['etag'];
    }
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
