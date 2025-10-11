import { NextRequest, NextResponse } from 'next/server';
import { verifyDriveToken } from './auth-utils';
import { getDriveBySlug } from './drives-config';

export async function requireDriveAuth(request: NextRequest, driveSlug: string) {
  const drive = getDriveBySlug(driveSlug);
  if (!drive) {
    return NextResponse.json(
      { error: 'Drive not found' },
      { status: 404 }
    );
  }

  if (!drive.requiresPassword) {
    return null;
  }

  const token = request.cookies.get('drive-auth')?.value;
  
  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required', requiresAuth: true },
      { status: 401 }
    );
  }

  const payload = await verifyDriveToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid authentication token', requiresAuth: true },
      { status: 401 }
    );
  }

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return NextResponse.json(
      { error: 'Authentication expired', requiresAuth: true },
      { status: 401 }
    );
  }

  if (payload.driveSlug !== driveSlug) {
    return NextResponse.json(
      { error: 'Invalid drive access', requiresAuth: true },
      { status: 403 }
    );
  }

  return null;
}

export function createAuthErrorResponse(message: string, requiresAuth: boolean = true) {
  return NextResponse.json(
    { error: message, requiresAuth },
    { status: 401 }
  );
}

export function validateFileId(fileId: string): boolean {
  return /^[a-zA-Z0-9_-]{20,}$/.test(fileId);
}

export function validateFolderId(folderId: string): boolean {
  return /^[a-zA-Z0-9_-]{5,}$/.test(folderId);
}

export function validateQuery(query: string): boolean {
  return typeof query === 'string' && query.trim().length >= 1 && query.trim().length <= 100;
}

export function validatePageSize(pageSize: number): boolean {
  return Number.isInteger(pageSize) && pageSize >= 1 && pageSize <= 200;
}

export function createCorsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Range, Content-Range, Content-Length, Content-Type',
    'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Length, Content-Range, ETag, Content-Type',
  };
}

export function createSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Download-Options': 'noopen',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Robots-Tag': 'noindex, nofollow',
  };
}

export function getCacheHeaders(mimeType: string, isPublic: boolean = true): Record<string, string> {
  const baseHeaders = {
    'Cache-Control': isPublic ? 'public, max-age=3600' : 'private, max-age=300',
    'Vary': 'Origin, Range',
  };
  
  if (mimeType.startsWith('image/')) {
    return { ...baseHeaders, 'Cache-Control': 'public, max-age=86400' };
  }
  
  if (mimeType.startsWith('video/') || mimeType.startsWith('audio/')) {
    return { ...baseHeaders, 'Cache-Control': 'public, max-age=7200' };
  }
  
  return baseHeaders;
}

export function handleApiError(error: unknown, context: string) {
  const message = typeof error === 'object' && error !== null && 'message' in error 
    ? (error as any).message : String(error);
  
  console.error(`❌ ${context} error:`, { error: message });
  
  if (message.includes('403') || message.includes('Forbidden')) {
    return { error: 'Access denied', status: 403 };
  }
  if (message.includes('404') || message.includes('Not Found')) {
    return { error: 'File not found', status: 404 };
  }
  if (message.includes('401') || message.includes('Unauthorized')) {
    return { error: 'Authentication required', status: 401 };
  }
  if (message.includes('429') || message.includes('Too Many Requests')) {
    return { error: 'Rate limit exceeded', status: 429 };
  }
  
  return { error: 'Internal server error', status: 500 };
}

export function validateRequest(request: Request, requiredParams: string[]): string[] {
  const { searchParams } = new URL(request.url);
  const missing: string[] = [];
  
  for (const param of requiredParams) {
    if (!searchParams.get(param)) {
      missing.push(param);
    }
  }
  
  return missing;
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, maxRequests: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (limit.count >= maxRequests) {
    return false;
  }
  
  limit.count++;
  return true;
}

export function logRequest(action: string, params: Record<string, any>, startTime: number, duration?: number) {
  const requestDuration = duration || (Date.now() - startTime);
  console.log(`📊 API Request: ${action}`, {
    params: Object.keys(params).reduce((acc, key) => {
      if (key.includes('token') || key.includes('password')) {
        acc[key] = '[REDACTED]';
      } else {
        acc[key] = params[key];
      }
      return acc;
    }, {} as Record<string, any>),
    duration: `${requestDuration}ms`,
    timestamp: new Date().toISOString()
  });
}

export interface DriveApiRequest {
  action: 'list' | 'search' | 'stream' | 'download';
  driveSlug?: string;
  fileId?: string;
  folderId?: string;
  query?: string;
  pageToken?: string;
  pageSize?: number;
  download?: boolean;
  expiry?: string;
  token?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  nextPageToken?: string;
}

export interface FileMetadata {
  id?: string | null;
  name?: string | null;
  mimeType?: string | null;
  size?: number | string | null;
  md5Checksum?: string | null;
  modifiedTime?: string | null;
}

export function createFileHeaders(metadata: FileMetadata, options: {
  mimeType?: string;
  wantDownload?: boolean;
  range?: string;
  isSecure?: boolean;
} = {}): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': options.mimeType || metadata.mimeType || 'application/octet-stream',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=3600',
    ...createCorsHeaders(),
    ...createSecurityHeaders(),
  };
  
  if (metadata.name) {
    const disposition = options.wantDownload ? 'attachment' : 'inline';
    headers['Content-Disposition'] = `${disposition}; filename="${metadata.name}"`;
  }
  
  if (metadata.size) {
    headers['Content-Length'] = String(metadata.size);
  }
  
  if (metadata.md5Checksum && metadata.size && metadata.modifiedTime) {
    headers['ETag'] = `W/"md5-${metadata.md5Checksum}-${metadata.size}-${metadata.modifiedTime}"`;
  }
  
  if (options.mimeType?.startsWith('audio/')) {
    headers['Accept-Ranges'] = 'bytes';
    delete headers['transfer-encoding'];
  }
  
  if (options.mimeType === 'application/pdf' && !options.wantDownload) {
    headers['Content-Disposition'] = 'inline';
    headers['X-Content-Type-Options'] = 'nosniff';
    delete headers['X-Frame-Options'];
  }
  
  return headers;
}
