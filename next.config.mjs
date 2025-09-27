/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: './',
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/maintanance',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/games',
        destination: '/maintanance',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
