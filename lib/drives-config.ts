
export interface DriveConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  requiresPassword: boolean;
  enabled: boolean;
  rootFolderId: string;
  password?: string;
  hint?: string;
}

export const drives: DriveConfig[] = [
  {
    id: 'public',
    name: 'Public Files',
    slug: 'public',
    description: 'Publicly Accessible Files',
    icon: '📁',
    requiresPassword: false,
    enabled: true,
    rootFolderId: process.env.ROOT_FOLDER_ID_PUBLIC || '',
    password: '',
    hint: process.env.ROOT_FOLDER_ID_PUBLIC?.slice(0, 8) + '...',
  },
  {
    id: 'private',
    name: 'Private Documents',
    slug: 'private',
    description: 'Private Protected Files',
    icon: '🔒',
    requiresPassword: true,
    enabled: true,
    rootFolderId: process.env.ROOT_FOLDER_ID_PRIVATE || '',
    password: process.env.DRIVE_PASSWORD_PRIVATE || '',
    hint: process.env.ROOT_FOLDER_ID_PRIVATE?.slice(0, 8) + '...',
  },
  {
    id: 'work',
    name: 'Work Files',
    slug: 'work',
    description: 'Work-Related Documents',
    icon: '💼',
    requiresPassword: true,
    enabled: true,
    rootFolderId: process.env.ROOT_FOLDER_ID_WORK || '',
    password: process.env.DRIVE_PASSWORD_WORK || '',
    hint: process.env.ROOT_FOLDER_ID_WORK?.slice(0, 8) + '...',
  },
  {
    id: 'personal',
    name: 'Personal',
    slug: 'personal',
    description: 'Personal Files and Documents',
    icon: '👤',
    requiresPassword: true,
    enabled: true,
    rootFolderId: process.env.ROOT_FOLDER_ID_PERSONAL || '',
    password: process.env.DRIVE_PASSWORD_PERSONAL || '',
    hint: process.env.ROOT_FOLDER_ID_PERSONAL?.slice(0, 8) + '...',
  }
];

export function getDriveBySlug(slug: string): DriveConfig | undefined {
  return drives.find(drive => drive.slug === slug);
}

export function getPublicDrive(): DriveConfig | undefined {
  return drives.find(drive => !drive.requiresPassword);
}

export function getProtectedDrives(): DriveConfig[] {
  return drives.filter(drive => drive.requiresPassword);
}

export function getEnabledDrives(): DriveConfig[] {
  return drives.filter(drive => drive.enabled);
}

export function getDriveWithPassword(driveSlug: string): DriveConfig | null {
  const drive = getDriveBySlug(driveSlug);
  if (!drive) return null;
  
  return drive;
}

export function validateDriveAccess(driveSlug: string, password?: string): boolean {
  const drive = getDriveBySlug(driveSlug);
  if (!drive || !drive.enabled) return false;
  
  if (!drive.requiresPassword) return true;
  
  if (!password || !drive.password) return false;
  
  return password === drive.password;
}
