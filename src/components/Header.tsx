'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/logo.png');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const navigate = (path: string) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push(path);
  };

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
          <button onClick={() => navigate('/')} className="flex items-center gap-2 sm:gap-3">
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
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 sm:space-x-6 lg:space-x-10">
            <button onClick={() => navigate('/')} className="text-gold hover:text-white transition-colors font-medium text-sm sm:text-base">
              Home
            </button>
            <button onClick={() => navigate('/about')} className="text-gold hover:text-white transition-colors font-medium text-sm sm:text-base">
              About Us
            </button>

            {/* Dropdown */}
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

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
                  <div className="py-2">
                    <button onClick={() => navigate('/categories/founder-stories')} className="w-full text-left block px-4 py-3 text-grey hover:text-gold hover:bg-gray-800 transition-colors text-sm">
                      Founder Stories
                    </button>
                    <button onClick={() => navigate('/categories/story-breakdowns')} className="w-full text-left block px-4 py-3 text-grey hover:text-gold hover:bg-gray-800 transition-colors text-sm">
                      Story Breakdowns
                    </button>
                    <button onClick={() => navigate('/categories/writing-branding')} className="w-full text-left block px-4 py-3 text-grey hover:text-gold hover:bg-gray-800 transition-colors text-sm">
                      Writing & Branding
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => navigate('/work-with-me')} className="text-gold hover:text-white transition-colors font-medium text-sm sm:text-base">
              Work With Me
            </button>
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
              <button onClick={() => navigate('/')} className="w-full text-left block px-4 py-3 text-gold hover:text-white hover:bg-gray-900 rounded-lg transition-colors font-medium">
                Home
              </button>
              <button onClick={() => navigate('/about')} className="w-full text-left block px-4 py-3 text-gold hover:text-white hover:bg-gray-900 rounded-lg transition-colors font-medium">
                About Us
              </button>
              <div className="border-t border-gray-800 my-2"></div>
              <div className="px-4 py-2">
                <p className="text-sm text-gold/70 font-medium mb-2">Stories & Writing</p>
                <div className="space-y-1">
                  <button onClick={() => navigate('/categories/founder-stories')} className="w-full text-left block px-4 py-2 text-grey hover:text-gold hover:bg-gray-900 rounded-lg transition-colors text-sm">
                    Founder Stories
                  </button>
                  <button onClick={() => navigate('/categories/story-breakdowns')} className="w-full text-left block px-4 py-2 text-grey hover:text-gold hover:bg-gray-900 rounded-lg transition-colors text-sm">
                    Story Breakdowns
                  </button>
                  <button onClick={() => navigate('/categories/writing-branding')} className="w-full text-left block px-4 py-2 text-grey hover:text-gold hover:bg-gray-900 rounded-lg transition-colors text-sm">
                    Writing & Branding
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-800 my-2"></div>
              <button onClick={() => navigate('/work-with-me')} className="w-full text-left block px-4 py-3 text-gold hover:text-white hover:bg-gray-900 rounded-lg transition-colors font-medium">
                Work With Me
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}