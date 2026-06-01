import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'branduntold.in',
      },
      {
        protocol: 'https',
        hostname: 'admin.branduntold.in',
      },
      // Backend (already there)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
      // ← ADD THIS for frontend (port 3000)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/data/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'https://admin.branduntold.in/api/data/:path*'
          : 'http://localhost:3001/api/data/:path*',
      }, 
      {
        source: '/uploads/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'https://admin.branduntold.in/uploads/:path*'
          : 'http://localhost:3001/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;