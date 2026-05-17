'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';
import { useState } from 'react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo}
              alt="BRAND UNTOLD"
              height={80}
              width={80}
              loading="eager"
              priority
              style={{ height: 'auto', width: 'auto' }}
            />
          
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-gold hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gold hover:text-white transition-colors font-medium">
              About Us
            </Link>
            <div 
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="text-gold hover:text-white transition-colors flex items-center gap-1 font-medium">
                Stories & Writing
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute left-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-xl transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="py-2">
                  <Link
                    href="/categories/founder-stories"
                    className="block px-4 py-3 text-grey hover:text-gold hover:bg-gray-800 transition-colors"
                  >
                    Founder Stories
                  </Link>
                  <Link
                    href="/categories/story-breakdowns"
                    className="block px-4 py-3 text-grey hover:text-gold hover:bg-gray-800 transition-colors"
                  >
                    Story Breakdowns
                  </Link>
                  <Link
                    href="/categories/writing-branding"
                    className="block px-4 py-3 text-grey hover:text-gold hover:bg-gray-800 transition-colors"
                  >
                    Writing & Branding
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/work-with-me" className="text-gold hover:text-white transition-colors font-medium">
              Work With Me
            </Link>
          </div>

          <div className="flex items-center gap-4">
         
          </div>
        </div>
      </nav>
    </header>
  );
}
