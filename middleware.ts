import { NextResponse, type NextRequest } from 'next/server'

const ALLOWED_ORIGINS = (process.env.NEXT_PUBLIC_ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

/**
 * Builds CORS response headers based on the request Origin and configured allowed origins.
 *
 * Determines the value for `Access-Control-Allow-Origin`: the request origin when allowed, `'*'` when no Origin is present and no restrictions are configured, or `'null'` when the origin is not allowed. Also includes standard CORS method, allowed headers, exposed headers, and `Vary` entries.
 *
 * @param req - The incoming NextRequest whose `Origin` header is evaluated
 * @returns A record of CORS-related response headers
 */
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

/**
 * Provides a set of standard HTTP security headers to attach to responses.
 *
 * @returns A record mapping header names to values:
 * - `X-Frame-Options`: `DENY`
 * - `X-Content-Type-Options`: `nosniff`
 * - `Referrer-Policy`: `strict-origin-when-cross-origin`
 * - `Permissions-Policy`: `geolocation=(), microphone=(), camera=()`
 * - `Strict-Transport-Security`: `max-age=15552000; includeSubDomains`
 */
function securityHeaders() {
  return {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=15552000; includeSubDomains',
  } as Record<string, string>
}

/**
 * Apply middleware handling for incoming requests: enforce drive-API method rules, respond to CORS preflight, and attach security and request metadata.
 *
 * For paths starting with /api/gdrive-file or /api/gdrive-download this middleware:
 * - Returns a 204 response with CORS headers for OPTIONS preflight requests.
 * - Returns a 405 JSON error for any method other than GET or HEAD.
 *
 * For all requests it:
 * - Attaches security headers and an `X-Request-Id` to the response.
 * - When handling drive API responses, also attaches CORS headers and `Accept-Ranges: bytes`.
 *
 * @returns A NextResponse configured for the request: a 204 preflight response, a 405 JSON error for disallowed drive API methods, or the continuation response augmented with security headers, `X-Request-Id`, and drive-specific CORS/Accept-Ranges when applicable.
 */
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const reqId = Math.random().toString(36).slice(2, 10)
  const isDriveApi = path.startsWith('/api/gdrive-file') || path.startsWith('/api/gdrive-download')

  if (isDriveApi && req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: { ...corsHeaders(req) } })
  }

  if (isDriveApi && !(req.method === 'GET' || req.method === 'HEAD')) {
    return new NextResponse(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(req) },
    })
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


