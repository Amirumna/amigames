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

/**
 * Creates an authenticated Google Drive v3 client using service account credentials from the environment.
 *
 * @returns An authenticated Drive v3 client instance configured with the module's credentials and scopes
 */
function getDriveClient() {
  const auth = getAuth()
  return google.drive({ version: "v3", auth })
}

/**
 * Create an HMAC-SHA256 download token for a file and expiry, optionally bound to a client IP.
 *
 * @param fileId - The Google Drive file ID to include in the token payload.
 * @param expiry - Expiry value included in the token payload (timestamp).
 * @param userIp - Optional client IP address to bind the token to.
 * @returns A hex-encoded HMAC-SHA256 digest of the token payload.
 * @throws If the GDRIVE_HMAC_SECRET environment variable is not set.
 */
export function generateDownloadToken(fileId: string, expiry: number, userIp?: string): string {
  if (!HMAC_SECRET) throw new Error("GDRIVE_HMAC_SECRET environment variable is required")
  const data = userIp ? `${fileId}|${expiry}|${userIp}` : `${fileId}|${expiry}`
  return nodeCrypto.createHmac('sha256', HMAC_SECRET).update(data).digest('hex')
}

/**
 * Validate a download HMAC token for a file and optional client IP against an expiry timestamp.
 *
 * @param fileId - The Drive file ID the token was generated for.
 * @param expiry - Expiration time as milliseconds since the Unix epoch.
 * @param token - The HMAC-SHA256 token to verify.
 * @param userIp - Optional client IP that was included when the token was generated.
 * @returns `true` if the provided token matches the expected HMAC and the current time is before `expiry`, `false` otherwise (also `false` if the HMAC secret is not configured).
 */
export function verifyDownloadToken(fileId: string, expiry: number, token: string, userIp?: string): boolean {
  if (!HMAC_SECRET) {
    return false
  }
  const expected = generateDownloadToken(fileId, expiry, userIp)
  return expected === token && Date.now() < expiry
}

/**
 * Searches Drive for files whose name contains the provided query string.
 *
 * @param query - Substring to match against file names
 * @param pageToken - Token identifying the page of results to return
 * @param pageSize - Maximum number of results to return
 * @returns An object with `files` (list of matching files) and `nextPageToken` when more results exist
 * @throws Error if `query` is missing or invalid, or if the Drive request fails
 */
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
    console.error("[gdrive-lib] searchFilesInDrive error", { query, error: message })
    throw new Error(message)
  }
}

/**
 * Constructs a direct download URL for a Google Drive file.
 *
 * @param fileId - The Drive file ID
 * @returns A URL that, when requested, returns the file's media content
 */
export function generateDownloadLink(fileId: string) {
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`
}

/**
 * Lists visible (non-trashed) files directly inside a Google Drive folder.
 *
 * Returns file entries (id, name, mimeType, optional size/thumbnail/icon/modifiedTime/driveId) and a next page token when available.
 *
 * @param folderId - The Google Drive folder ID to list files from.
 * @param pageToken - Optional token to continue a previous paginated listing.
 * @param pageSize - Maximum number of files to return in this page (default 100).
 * @returns An object containing `files` (array of DriveFile) and `nextPageToken` when more results exist.
 * @throws Error if `folderId` is missing or invalid, or if the Drive API call fails.
 */
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
    console.error("[gdrive-lib] listFilesInFolder error", { folderId, error: message })
    throw new Error(message)
  }
}

/**
 * Retrieve metadata for a Google Drive file.
 *
 * @param fileId - The Google Drive file ID to fetch metadata for
 * @returns The file metadata object containing `id`, `name`, `mimeType`, `size`, `thumbnailLink`, `md5Checksum`, and `modifiedTime`
 * @throws Error if `fileId` is invalid or the Drive API request fails; the error message contains the underlying failure reason
 */
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
    console.error("[gdrive-lib] getFileMetadata error", { fileId, error: message })
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
    console.error("[gdrive-lib] downloadFile error", { fileId, range, error: message })
    throw new Error(message)
  }
}
