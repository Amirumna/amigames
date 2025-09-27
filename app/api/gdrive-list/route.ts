import { NextResponse } from 'next/server'
import { listFilesInFolder } from '@/lib/gdrive'

const ROOT_FOLDER_ID = '1_yCFzAVw94nrgq46kcOjZrNH7mI7vaY1';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folderId = searchParams.get('folderId') || ROOT_FOLDER_ID;
  const pageToken = searchParams.get('pageToken') || undefined;
  const pageSize = searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : 100;

  if (!folderId || typeof folderId !== 'string' || folderId.length < 5) {
    console.error('[gdrive-list] Missing or invalid folderId', { folderId });
    return NextResponse.json({ error: 'Missing or invalid folderId' }, { status: 400 });
  }

  try {
    const { files, nextPageToken } = await listFilesInFolder(folderId, pageToken, pageSize);
    return NextResponse.json({ files, nextPageToken });
  } catch (error) {
    const message = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error);
    console.error('[gdrive-list] List error', { folderId, error: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
