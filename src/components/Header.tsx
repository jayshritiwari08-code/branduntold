'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/logo.png');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await fetch('/api/data/footer');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          const footerData = json.data[0];
          if (footerData.footerlogo) {
            setLogoSrc(footerData.footerlogo);
          }
        }
      } catch (err) {
        console.error("Failed to fetch footer data:", err);
      }
    };
    fetchFooterData();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src={logoSrc}
              alt="BRAND UNTOLD"
              height={90}
              width={90}
              className="lg:w-[8rem] mt-5"
              loading="eager"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 sm:space-x-6 lg:space-x-10">
            <Link href="/" className="text-gold hover:text-white transition-colors font-medium text-sm sm:text-base">
              Home
            </Link>
            <Link href="/about" className="text-gold hover:text-white transition-colors font-medium text-sm sm:text-base">
              About Us
            </Link>

            {/* Dropdown — click to open, click outside to close */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-gold hover:text-white transition-colors flex items-center gap-1 font-medium text-sm sm:text-base"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                Stories & Writing
                <svg
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
                  <div className="py-2">
                    <Link
                      href="/categories/founder-stories"
                      className="block px-4 py-3 text-grey hover:text-gold hover:bg-gray-800 transition-colors text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDropdownOpen(false);
                        window.location.href = '/categories/founder-stories';
                      }}
                    >
                      Founder Stories
                    </Link>
                    <Link
                      href="/categories/story-breakdowns"
                      className="block px-4 py-3 text-grey hover:text-gold hover:bg-gray-800 transition-colors text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDropdownOpen(false);
                        window.location.href = '/categories/story-breakdowns';
                      }}
                    >
                      Story Breakdowns
                    </Link>
                    <Link
                      href="/categories/writing-branding"
                      className="block px-4 py-3 text-grey hover:text-gold hover:bg-gray-800 transition-colors text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDropdownOpen(false);
                        window.location.href = '/categories/writing-branding';
                      }}
                    >
                      Writing & Branding
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/work-with-me" className="text-gold hover:text-white transition-colors font-medium text-sm sm:text-base">
              Work With Me
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center gap-2 text-gold hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full h-screen bg-black/95 backdrop-blur-sm border-b border-gray-800 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="px-2.5 py-4 space-y-2">
              <Link href="/" className="block px-4 py-3 text-gold hover:text-white hover:bg-gray-900 rounded-lg transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="block px-4 py-3 text-gold hover:text-white hover:bg-gray-900 rounded-lg transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                About Us
              </Link>
              <div className="border-t border-gray-800 my-2"></div>
              <div className="px-4 py-2">
                <p className="text-sm text-gold/70 font-medium mb-2">Stories & Writing</p>
                <div className="space-y-1">
                  <Link href="/categories/founder-stories" className="block px-4 py-2 text-grey hover:text-gold hover:bg-gray-900 rounded-lg transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    Founder Stories
                  </Link>
                  <Link href="/categories/story-breakdowns" className="block px-4 py-2 text-grey hover:text-gold hover:bg-gray-900 rounded-lg transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    Story Breakdowns
                  </Link>
                  <Link href="/categories/writing-branding" className="block px-4 py-2 text-grey hover:text-gold hover:bg-gray-900 rounded-lg transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    Writing & Branding
                  </Link>
                </div>
              </div>
              <div className="border-t border-gray-800 my-2"></div>
              <Link href="/work-with-me" className="block px-4 py-3 text-gold hover:text-white hover:bg-gray-900 rounded-lg transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Work With Me
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}