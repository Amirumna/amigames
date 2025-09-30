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

export function isFolder(file: Pick<DriveFile, 'mimeType'>): boolean {
  return file.mimeType === 'application/vnd.google-apps.folder'
}

export type DriveListResponse = {
  files?: DriveFile[]
  nextPageToken?: string
}


