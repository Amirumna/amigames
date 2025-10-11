import { google } from "googleapis"
import nodeCrypto from "crypto"
import type { DriveListResponse, DriveFile } from "./types"

const HMAC_SECRET = process.env.GDRIVE_HMAC_SECRET

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

function getAuth() {
  const credentials = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`,
  }

  if (!credentials.project_id || !credentials.private_key || !credentials.client_email) {
    throw new Error("Missing required Google service account environment variables")
  }

  return new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  })
}

function getDriveClient() {
  const auth = getAuth()
  return google.drive({ version: "v3", auth })
}

export function generateDownloadToken(fileId: string, expiry: number, userIp?: string): string {
  if (!HMAC_SECRET) throw new Error("GDRIVE_HMAC_SECRET environment variable is required")
  const data = userIp ? `${fileId}|${expiry}|${userIp}` : `${fileId}|${expiry}`
  return nodeCrypto.createHmac('sha256', HMAC_SECRET).update(data).digest('hex')
}

export function verifyDownloadToken(fileId: string, expiry: number, token: string, userIp?: string): boolean {
  if (!HMAC_SECRET) {
    return false
  }
  const expected = generateDownloadToken(fileId, expiry, userIp)
  return expected === token && Date.now() < expiry
}

export async function searchFilesInDrive(query: string, pageToken?: string, pageSize = 100): Promise<DriveListResponse> {
  try {
    if (typeof query !== "string" || query.length < 1) {
      throw new Error("Missing or invalid query")
    }
    const safeQuery = query.replace(/['"\\]/g, "")
    const drive = getDriveClient()
    const res = await drive.files.list({
      q: `trashed = false and name contains '${safeQuery}'`,
      fields: "nextPageToken, files(id, name, mimeType, size, thumbnailLink, iconLink, modifiedTime, driveId)",
      pageToken,
      pageSize,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    })
    const files: DriveFile[] = (res.data.files ?? [])
      .filter(f => !!f.id && !!f.name && !!f.mimeType)
      .map(f => ({
        id: f.id as string,
        name: f.name as string,
        mimeType: f.mimeType as string,
        size: (f.size ?? undefined) as string | undefined,
        thumbnailLink: f.thumbnailLink ?? undefined,
        iconLink: f.iconLink ?? undefined,
        modifiedTime: f.modifiedTime ?? undefined,
        driveId: (f as any).driveId,
      }))
    return { files, nextPageToken: res.data.nextPageToken ?? undefined }
  } catch (error) {
    const message =
      typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error)
    console.error("searchFilesInDrive error", { query, error: message })
    throw new Error(message)
  }
}

export function generateDownloadLink(fileId: string) {
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`
}

export async function listFilesInFolder(folderId: string, pageToken?: string, pageSize = 100): Promise<DriveListResponse> {
  try {
    if (typeof folderId !== "string" || folderId.length < 5) {
      throw new Error("Missing or invalid folderId")
    }
    const safeFolderId = folderId.replace(/['"\\]/g, "")
    const drive = getDriveClient()
    const res = await drive.files.list({
      q: `'${safeFolderId}' in parents and trashed = false`,
      fields: "nextPageToken, files(id, name, mimeType, size, thumbnailLink, iconLink, modifiedTime, driveId)",
      pageToken,
      pageSize,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    })
    const files: DriveFile[] = (res.data.files ?? [])
      .filter(f => !!f.id && !!f.name && !!f.mimeType)
      .map(f => ({
        id: f.id as string,
        name: f.name as string,
        mimeType: f.mimeType as string,
        size: (f.size ?? undefined) as string | undefined,
        thumbnailLink: f.thumbnailLink ?? undefined,
        iconLink: f.iconLink ?? undefined,
        modifiedTime: f.modifiedTime ?? undefined,
        driveId: (f as any).driveId,
      }))
    return { files, nextPageToken: res.data.nextPageToken ?? undefined }
  } catch (error) {
    const message =
      typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error)
    console.error("listFilesInFolder error", { folderId, error: message })
    throw new Error(message)
  }
}

export async function getFileMetadata(fileId: string) {
  try {
    if (typeof fileId !== "string" || fileId.length < 5) {
      throw new Error("Missing or invalid fileId")
    }
    const safeFileId = fileId.replace(/['"\\]/g, "")
    const drive = getDriveClient()
    const res = await drive.files.get({
      fileId: safeFileId,
      fields: "id, name, mimeType, size, thumbnailLink, md5Checksum, modifiedTime",
      supportsAllDrives: true,
    })
    return res.data
  } catch (error) {
    const message =
      typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error)
    console.error("getFileMetadata error", { fileId, error: message })
    throw new Error(message)
  }
}

export async function downloadFile(fileId: string, range?: string) {
  try {
    if (typeof fileId !== "string" || fileId.length < 5) {
      throw new Error("Missing or invalid fileId")
    }
    const safeFileId = fileId.replace(/['"\\]/g, "")
    const drive = getDriveClient()
    const headers: Record<string, string> = {}
    if (range) {
      headers["Range"] = range
    }
    const res = await drive.files.get(
      {
        fileId: safeFileId,
        alt: "media",
        supportsAllDrives: true,
      },
      { responseType: "stream", headers },
    )
    return { stream: res.data, headers: res.headers }
  } catch (error) {
    const message =
      typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error)
    console.error("❌ downloadFile error", { fileId, range, error: message })
    throw new Error(message)
  }
}
