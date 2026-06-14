'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogPostError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console or error service
    console.error('BlogPostError boundary captured an exception:', error);
  }, [error]);

  return (
    <div
      className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-20 px-4"
      style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="152" height="152" viewBox="0 0 152 152"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="temple" fill="%23d4af37" fill-opacity="0.06"%3E%3Cpath d="M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/80" />

      <div 
        className="relative max-w-md w-full text-center p-8 md:p-12 rounded-3xl border border-red-500/20 shadow-2xl space-y-6 animate-fadeIn"
        style={{
          background: 'linear-gradient(160deg, #141414 0%, #0c0c0c 100%)',
          boxShadow: '0 25px 70px rgba(0,0,0,0.8), 0 4px 24px rgba(239, 68, 68, 0.05)',
        }}
      >
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto">
          <span className="text-3xl">⚠️</span>
        </div>

        <div className="space-y-2">
          <p className="font-sans tracking-[3px] text-[#c2a15f] text-sm uppercase">ERROR ENCOUNTERED</p>
          <h2 className="font-serif text-3xl font-bold text-white leading-tight">
            Failed to load article
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            There was a problem rendering or fetching this page. Please try again or navigate back home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#c2a15f] hover:bg-white text-black font-semibold rounded-xl text-sm transition-all duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold rounded-xl text-sm transition-all duration-300"
          >
            Go back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
