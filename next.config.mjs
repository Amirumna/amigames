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
        source: '/home',
        destination: '/',
        permanent: true,
      },      
      {
        source: '/games/honkai-star-rail',
        destination: '/maintanance',
        permanent: true,
      },
      {
        source: '/games/valorant',
        destination: '/maintanance',
        permanent: true,
      },
      {
        source: '/home/games/wuthering-waves',
        destination: '/maintanance',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/maintanance',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
