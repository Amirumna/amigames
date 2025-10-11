import { NextResponse, type NextRequest } from 'next/server'

const ALLOWED_ORIGINS = (process.env.NEXT_PUBLIC_ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  const allowed = ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin)
  return {
    'Access-Control-Allow-Origin': allowed ? (origin || '*') : 'null',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
    'Access-Control-Allow-Headers': 'Range, Content-Type, Accept, Origin, Authorization',
    'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Length, Content-Range, ETag',
    'Vary': 'Origin, Range',
  } as Record<string, string>
}

function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=15552000; includeSubDomains',
  } as Record<string, string>
}

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const reqId = Math.random().toString(36).slice(2, 10)
  const isDriveApi = path.startsWith('/api/gdrive')
  const isKertasRoute = path.startsWith('/kertas/')

  if (isDriveApi && req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: { ...corsHeaders(req) } })
  }

  if (isDriveApi && !(req.method === 'GET' || req.method === 'HEAD')) {
    return new NextResponse(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(req) },
    })
  }

  if (isKertasRoute && path !== '/kertas') {
    const pathSegments = path.split('/').filter(Boolean)
    if (pathSegments.length >= 2) {
      const driveSlug = pathSegments[1]
      
      if (driveSlug !== 'public') {
        const token = req.cookies.get('drive-auth')?.value
        
        if (!token) {
          return NextResponse.redirect(new URL('/kertas', req.url))
        }
        
      }
    }
  }

  const res = NextResponse.next()
  const sh = securityHeaders()
  for (const [k, v] of Object.entries(sh)) res.headers.set(k, v)
  res.headers.set('X-Request-Id', reqId)

  if (isDriveApi) {
    const ch = corsHeaders(req)
    for (const [k, v] of Object.entries(ch)) res.headers.set(k, v)
    res.headers.set('Accept-Ranges', 'bytes')
  }
  return res
}

export const config = {
  matcher: ['/api/:path*', '/kertas/:path*'],
}
