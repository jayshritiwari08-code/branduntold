import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images for faster loading
  images: {
    unoptimized: false, // Enable Next.js image optimization
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
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      // Cloudinary domain
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Turbopack configuration (for Next.js 16+)
  turbopack: {
    // Turbopack handles code splitting automatically
  },

  // Enable compressible formats
  compress: true,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3001/uploads/:path*',
      },
    ];
  },

  // Optimize page load
  output: 'standalone',
};

export default nextConfig;