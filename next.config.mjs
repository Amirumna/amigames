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
        destination: '/maintenance',
        permanent: true,
      },
      {
        source: '/games/valorant',
        destination: '/maintenance',
        permanent: true,
      },
      {
        source: '/home/games/wuthering-waves',
        destination: '/maintenance',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/maintenance',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
