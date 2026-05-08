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
              className="h-20 w-auto"
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
                    href="/founder-stories" 
                    className="block px-4 py-3 text-grey hover:text-gold hover:bg-gray-800 transition-colors"
                  >
                    Founder Stories
                  </Link>
                  <Link 
                    href="/story-breakdowns" 
                    className="block px-4 py-3 text-grey hover:text-gold hover:bg-gray-800 transition-colors"
                  >
                    Story Breakdowns
                  </Link>
                  <Link 
                    href="/writing-branding" 
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
            <button className="text-gold hover:text-white transition-colors p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="md:hidden text-gold p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
