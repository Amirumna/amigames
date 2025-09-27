import { NextResponse } from 'next/server'
import { searchFilesInDrive } from '@/lib/gdrive'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const pageToken = searchParams.get('pageToken') || undefined;
  const pageSize = searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : 100;

  if (typeof query !== 'string' || query.length < 1) {
    console.error('[gdrive-search] Missing or invalid query', { query });
    return NextResponse.json({ error: 'Missing or invalid query' }, { status: 400 });
  }

  try {
    const { files, nextPageToken } = await searchFilesInDrive(query, pageToken, pageSize);
    return NextResponse.json({ files, nextPageToken });
  } catch (error) {
    const message = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error);
    console.error('[gdrive-search] Search error', { query, error: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
