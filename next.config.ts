import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images for faster loading
  staticPageGenerationTimeout: 300,
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
        protocol: 'http',
        hostname: 'branduntold.in',
      },
      {
        protocol: 'https',
        hostname: 'admin.branduntold.in',
      },
      {
        protocol: 'http',
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
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },

    ],
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'], // Use WebP for better performance
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns'],
    // Enable CSS optimization
    optimizeCss: true,
  },

  // Enable compressible formats
  compress: true,


  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://admin.branduntold.in';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${apiUrl}/uploads/:path*`,
      },
    ];
  },

  // Headers for better caching and performance
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|gif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;