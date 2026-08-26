'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // If it's a chunk loading failure after deployment, automatically reload page to fetch new scripts
    if (
      error.message?.includes('Loading chunk') ||
      error.message?.includes('ChunkLoadError') ||
      error.name === 'ChunkLoadError'
    ) {
      window.location.reload();
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-black px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1
          className="text-2xl sm:text-3xl font-bold text-gold"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Something went wrong
        </h1>

        <p className="text-gray-400 text-sm sm:text-base font-sans">
          We encountered an issue loading this page. Please try refreshing or return to the home page.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gold text-black font-semibold text-sm hover:bg-gold/90 transition-colors cursor-pointer"
          >
            Reload Page
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-colors text-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
