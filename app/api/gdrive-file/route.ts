import { NextResponse } from 'next/server'
import { downloadFile } from '@/lib/gdrive'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');
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
    resHeaders['Access-Control-Allow-Origin'] = '*';
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
