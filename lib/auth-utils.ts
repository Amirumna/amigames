import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getDriveWithPassword, getDriveBySlug } from './drives-config';

const SESSION_SECRET = process.env.SESSION_SECRET || 'ýour-session-secret';
if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is required');
}
const JWT_SECRET = new TextEncoder().encode(SESSION_SECRET);

export interface DriveTokenPayload {
  driveSlug: string;
  exp: number;
  iat: number;
}

export async function generateDriveToken(driveSlug: string): Promise<string> {

  const now = Math.floor(Date.now() / 1000);
  const exp = now + (24 * 60 * 60);

  return await new SignJWT({ driveSlug, exp, iat: now })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(exp)
    .sign(JWT_SECRET);
}

export async function verifyDriveToken(token: string): Promise<DriveTokenPayload | null> {
  try {

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as DriveTokenPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

export async function verifyPassword(driveSlug: string, password: string): Promise<boolean> {
  const drive = getDriveWithPassword(driveSlug);
  if (!drive || !drive.requiresPassword || !drive.password) {
    return false;
  }

  try {
    return password === drive.password;
  } catch (error) {
    console.error('Password verification failed:', error);
    return false;
  }
}

export async function getAuthenticatedDrive(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('drive-auth')?.value;
    
    if (!token) {
      return null;
    }

    const payload = await verifyDriveToken(token);
    if (!payload || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload.driveSlug;
  } catch (error) {
    console.error('Failed to get authenticated drive:', error);
    return null;
  }
}

export async function setDriveAuthCookie(driveSlug: string): Promise<void> {
  try {
    const token = await generateDriveToken(driveSlug);
    const cookieStore = await cookies();
    
    cookieStore.set('drive-auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
      path: '/'
    });
  } catch (error) {
    console.error('Failed to set drive auth cookie:', error);
    throw error;
  }
}

export async function setDriveAuthCookieInResponse(response: NextResponse, driveSlug: string): Promise<NextResponse> {
  try {
    const token = await generateDriveToken(driveSlug);
    
    response.cookies.set('drive-auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('Failed to set drive auth cookie in response:', error);
    throw error;
  }
}

export async function clearDriveAuthCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('drive-auth');
  } catch (error) {
    console.error('Failed to clear drive auth cookie:', error);
  }
}

export function hasDriveAccess(driveSlug: string, authenticatedDrives: string[]): boolean {
  const drive = getDriveBySlug(driveSlug);
  if (!drive) return false;
  
  if (!drive.requiresPassword) return true;
  
  return authenticatedDrives.includes(driveSlug);
}
