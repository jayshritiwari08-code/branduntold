'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const [footerData, setFooterData] = useState<any>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await fetch('/api/data/footer');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setFooterData(json.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch footer data:", err);
      }
    };
    fetchFooterData();
  }, []);

  const logoSrc = footerData?.footerlogo
    ? (footerData.footerlogo.startsWith('/') ? `${baseUrl}${footerData.footerlogo}` : footerData.footerlogo)
    : '/logo.png';

  return (
    <footer className="bg-black  border-t border-gold mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Logo + Description */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src={logoSrc}
                alt="BRAND UNTOLD"
                width={96}
                height={96}
                style={{ height: 'auto', width: 'auto' }}
              />
            </div>
            
            <p className="text-grey text-[15px] leading-relaxed max-w-md">
              {footerData?.description || 'A platform dedicated to uncovering the real stories behind brands and founders — the thinking, the risks, the turning points, and the craft of storytelling.'}
            </p>

            <div className="mt-8 flex gap-6 text-xl">
              {footerData?.facebook && (
                <a href={footerData.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  <span className="font-bold text-2xl">f</span>
                </a>
              )}
              {footerData?.instagram && (
                <a href={footerData.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  <span className="font-bold text-2xl">ig</span>
                </a>
              )}
              {footerData?.linkedin && (
                <a href={footerData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  <span className="font-bold text-2xl">in</span>
                </a>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-gold text-lg mb-5">Categories</h4>
            <ul className="space-y-3 text-grey">
              <li>
                <Link href="/categories/founder-stories" className="hover:text-gold transition-colors">
                  Founder Stories
                </Link>
              </li>
              <li>
                <Link href="/categories/story-breakdowns" className="hover:text-gold transition-colors">
                  Story Breakdowns
                </Link>
              </li>
              <li>
                <Link href="/categories/writing-branding" className="hover:text-gold transition-colors">
                  Writing & Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-gold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3 text-grey">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/work-with-me" className="hover:text-gold transition-colors">
                  Work With Me
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Map */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-gold text-lg mb-5">Visit Us</h4>
            
            <div className="text-sm text-grey space-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gold" />
                <div>
                  <p>123 Story Avenue</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gold" />
                <p>hello@branduntold.com</p>
              </div>
            </div>

           
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-grey">
          <p>
            &copy; {new Date().getFullYear()} BRAND UNTOLD. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
