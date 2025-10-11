import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, generateDriveToken, verifyDriveToken } from '@/lib/auth-utils';
import { getDriveBySlug } from '@/lib/drives-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { driveSlug?: string; password?: string };
    const { driveSlug, password } = body;

    console.log('🔐 Drive auth attempt:', { driveSlug, hasPassword: !!password });

    if (!driveSlug || !password) {
      return NextResponse.json(
        { error: 'Drive slug and password are required' },
        { status: 400 }
      );
    }

    const drive = getDriveBySlug(driveSlug);
    if (!drive) {
      console.log('❌ Drive not found:', driveSlug);
      return NextResponse.json(
        { error: 'Drive not found' },
        { status: 404 }
      );
    }

    console.log('✅ Drive found:', { 
      name: drive.name, 
      requiresPassword: drive.requiresPassword,
      hasPassword: !!drive.password 
    });

    if (!drive.requiresPassword) {
      return NextResponse.json(
        { error: 'This drive does not require authentication' },
        { status: 400 }
      );
    }

    if (!drive.password) {
      console.log('❌ No password found for drive:', driveSlug);
      return NextResponse.json(
        { error: 'Drive authentication not configured. Please check environment variables.' },
        { status: 500 }
      );
    }

    console.log('🔍 Verifying password...');
    const isValid = await verifyPassword(driveSlug, password);
    console.log('🔍 Password verification result:', isValid);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    console.log('🎫 Generating JWT token...');
    const token = await generateDriveToken(driveSlug);
    
    const response = NextResponse.json(
      { 
        success: true, 
        driveSlug,
        message: 'Authentication successful',
        expiresIn: '24 hours'
      },
      { status: 200 }
    );

    response.cookies.set('drive-auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
      path: '/'
    });

    console.log('✅ Authentication successful for drive:', driveSlug);
    return response;
  } catch (error) {
    console.error('❌ Drive authentication error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('drive-auth')?.value;
    
    console.log('🔍 Verifying drive authentication...');
    
    if (!token) {
      console.log('❌ No authentication token found');
      return NextResponse.json(
        { authenticated: false, error: 'No authentication token found' },
        { status: 401 }
      );
    }

    console.log('🎫 Token found, verifying...');
    const payload = await verifyDriveToken(token);
    
    if (!payload) {
      console.log('❌ Invalid token');
      return NextResponse.json(
        { authenticated: false, error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      console.log('❌ Token expired');
      return NextResponse.json(
        { authenticated: false, error: 'Authentication token expired' },
        { status: 401 }
      );
    }

    console.log('✅ Authentication verified for drive:', payload.driveSlug);
    return NextResponse.json({
      authenticated: true,
      driveSlug: payload.driveSlug,
      expiresAt: payload.exp,
      expiresIn: Math.max(0, payload.exp - now)
    });
  } catch (error) {
    console.error('❌ Drive verification error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}