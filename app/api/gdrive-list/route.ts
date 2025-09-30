import { NextResponse } from 'next/server'
import { listFilesInFolder } from '@/lib/gdrive'

const ROOT_FOLDER_ID = process.env.ROOT_FOLDER_ID

/**
 * Handle GET requests to list files in a Google Drive folder based on query parameters.
 *
 * Accepts query parameters:
 * - `folderId`: ID of the folder to list (falls back to the configured ROOT_FOLDER_ID if absent).
 * - `pageToken`: pagination token to continue a previous listing.
 * - `pageSize`: number of items to return (clamped to 1–200, defaults to 100).
 *
 * @param request - Incoming request whose URL search params determine the listing behavior.
 * @returns A JSON response containing `{ files, nextPageToken }` on success, or `{ error }` with an appropriate HTTP status on failure.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folderParam = searchParams.get('folderId');
  const folderId = folderParam || ROOT_FOLDER_ID;
  const pageToken = searchParams.get('pageToken') || undefined;
  const pageSize = Math.max(1, Math.min(200, searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : 100));

  if (!folderId || typeof folderId !== 'string' || folderId.length < 5) {
    if (!folderParam && !ROOT_FOLDER_ID) {
      console.error('[gdrive-list] ROOT_FOLDER_ID not set');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }
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
