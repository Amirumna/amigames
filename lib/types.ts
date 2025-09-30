export interface DriveFile {
  id: string
  name: string
  mimeType: string
  size?: string | number
  thumbnailLink?: string
  iconLink?: string
  modifiedTime?: string
  driveId?: string
}

/**
 * Determines whether a Drive file represents a folder.
 *
 * @param file - Object containing the file's `mimeType` to evaluate
 * @returns `true` if the file's MIME type is 'application/vnd.google-apps.folder', `false` otherwise
 */
export function isFolder(file: Pick<DriveFile, 'mimeType'>): boolean {
  return file.mimeType === 'application/vnd.google-apps.folder'
}

export type DriveListResponse = {
  files?: DriveFile[]
  nextPageToken?: string
}


