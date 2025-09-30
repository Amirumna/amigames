import { NextResponse } from 'next/server'
import { downloadFile } from '@/lib/gdrive'

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
