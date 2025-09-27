import crypto from 'crypto'
import { google } from 'googleapis'
import { readFileSync } from 'fs'
import path from 'path'

const HMAC_SECRET = process.env.GDRIVE_HMAC_SECRET || 's8vrJHyIWfeqR6uifBGvhGmyHX4fbuzsX5UTriZ8TCyyfhfj1Kc3OPVs02x1CJDe';

export function generateDownloadToken(fileId: string, expiry: number, userIp?: string): string {
  const data = userIp ? `${fileId}|${expiry}|${userIp}` : `${fileId}|${expiry}`;
  return crypto.createHmac('sha256', HMAC_SECRET).update(data).digest('hex');
}

export function verifyDownloadToken(fileId: string, expiry: number, token: string, userIp?: string): boolean {
  const expected = generateDownloadToken(fileId, expiry, userIp);
  return expected === token && Date.now() < expiry;
}

export async function searchFilesInDrive(query: string, pageToken?: string, pageSize: number = 100) {
  try {
    if (typeof query !== 'string' || query.length < 1) {
      throw new Error('Missing or invalid query');
    }
    const safeQuery = query.replace(/['"\\]/g, '');
    const drive = getDriveClient();
    const res = await drive.files.list({
      q: `trashed = false and name contains '${safeQuery}'`,
      fields: 'nextPageToken, files(id, name, mimeType, size, thumbnailLink, iconLink, modifiedTime, driveId)',
      pageToken,
      pageSize,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    return { files: res.data.files, nextPageToken: res.data.nextPageToken };
  } catch (error) {
    const message = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error);
    console.error('[gdrive-lib] searchFilesInDrive error', { query, error: message });
    throw new Error(message);
  }
}

export function generateDownloadLink(fileId: string) {
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
}

const KEYFILEPATH = path.join(process.cwd(), './service-account.json');
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

function getAuth() {
  const keyFile = readFileSync(KEYFILEPATH, 'utf8');
  const credentials = JSON.parse(keyFile);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
}

function getDriveClient() {
  const auth = getAuth();
  return google.drive({ version: 'v3', auth });
}

export async function listFilesInFolder(folderId: string, pageToken?: string, pageSize: number = 100) {
  try {
    if (typeof folderId !== 'string' || folderId.length < 5) {
      throw new Error('Missing or invalid folderId');
    }
    const safeFolderId = folderId.replace(/['"\\]/g, '');
    const drive = getDriveClient();
    const res = await drive.files.list({
      q: `'${safeFolderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, size, thumbnailLink, iconLink, modifiedTime, driveId)',
      pageToken,
      pageSize,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    return { files: res.data.files, nextPageToken: res.data.nextPageToken };
  } catch (error) {
    const message = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error);
    console.error('[gdrive-lib] listFilesInFolder error', { folderId, error: message });
    throw new Error(message);
  }
}

export async function getFileMetadata(fileId: string) {
  try {
    if (typeof fileId !== 'string' || fileId.length < 5) {
      throw new Error('Missing or invalid fileId');
    }
    const safeFileId = fileId.replace(/['"\\]/g, '');
    const drive = getDriveClient();
    const res = await drive.files.get({
      fileId: safeFileId,
      fields: 'id, name, mimeType, size, thumbnailLink',
    });
    return res.data;
  } catch (error) {
    const message = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error);
    console.error('[gdrive-lib] getFileMetadata error', { fileId, error: message });
    throw new Error(message);
  }
}

export async function downloadFile(fileId: string, range?: string) {
  try {
    if (typeof fileId !== 'string' || fileId.length < 5) {
      throw new Error('Missing or invalid fileId');
    }
    const safeFileId = fileId.replace(/['"\\]/g, '');
    const drive = getDriveClient();
    const headers: Record<string, string> = {};
    if (range) {
      headers['Range'] = range;
    }
    const res = await drive.files.get({
      fileId: safeFileId,
      alt: 'media',
    }, { responseType: 'stream', headers });
    return { stream: res.data, headers: res.headers };
  } catch (error) {
    const message = typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error);
    console.error('[gdrive-lib] downloadFile error', { fileId, range, error: message });
    throw new Error(message);
  }
}
