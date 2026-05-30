import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/data/:path*',
        destination: 'https://cms-baas.vercel.app/api/data/:path*',
      }, 
      {
        source: '/uploads/:path*',
        destination: 'https://cms-baas.vercel.app/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;