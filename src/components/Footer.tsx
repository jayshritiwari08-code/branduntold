'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await fetch('/api/data/footer');
        const json = await res.json();
        console.log("Footer data fetched:", json);
        if (json.success && json.data && json.data.length > 0) {
          setFooterData(json.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch footer data:", err);
      }
    };
    fetchFooterData();
  }, []);

  const logoSrc = footerData?.footerlogo || '/logo.png';

  return (
    <footer className="bg-black  border-t border-gold mt-auto" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Logo + Description */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src={logoSrc}
                alt="BRAND UNTOLD"
                width={120}
                height={120}
                className=""
                sizes="120px"
              />
            </div>
            
            <p className="text-grey text-[15px] leading-relaxed max-w-md">
              {footerData?.description || 'A platform dedicated to uncovering the real stories behind brands and founders — the thinking, the risks, the turning points, and the craft of storytelling.'}
            </p>

            <div className="mt-8 flex gap-6 text-xl">
              {footerData?.facebook && (
                <a href={footerData.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            
<svg width="40px" height="40px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fillRule="evenodd">
    <path d="m0 0h32v32h-32z"/>
    <g fill="#c2a15f" fillRule="nonzero">
      <path d="m32 16c0-8.83636363-7.1636364-16-16-16-8.83636362 0-16 7.16363638-16 16 0 8.8363636 7.16363638 16 16 16 8.8363636 0 16-7.1636364 16-16zm-30.54545453 0c0-8.03345453 6.512-14.54545453 14.54545453-14.54545453 8.0334545 0 14.5454545 6.512 14.5454545 14.54545453 0 8.0334545-6.512 14.5454545-14.5454545 14.5454545-8.03345453 0-14.54545453-6.512-14.54545453-14.5454545z"/>
      <path d="m16.6138182 25.2349091v-9.2349091h3.0472727l.4814545-3.0603636h-3.5287272v-1.5345455c0-.7985455.2618182-1.56072727 1.408-1.56072727h2.2909091v-3.05454547h-3.2523636c-2.7345455 0-3.4807273 1.80072728-3.4807273 4.29672724v1.8516364h-1.8763637v3.0618182h1.8763636v9.2349091z"/>
    </g>
  </g>
</svg>     </a>
              )}
              {footerData?.instagram && (
                <a href={footerData.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  <span className="font-bold text-2xl">
                   <svg fill="#c2a15f" height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	 viewBox="-143 145 512 512" xmlSpace="preserve">
<g>
	<path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7
		c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4
		c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8
		c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4
		c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"/>
	<path d="M191.6,273h-157c-27.3,0-49.5,22.2-49.5,49.5v52.3v104.8c0,27.3,22.2,49.5,49.5,49.5h157c27.3,0,49.5-22.2,49.5-49.5V374.7
		v-52.3C241,295.2,218.8,273,191.6,273z M205.8,302.5h5.7v5.6v37.8l-43.3,0.1l-0.1-43.4L205.8,302.5z M76.5,374.7
		c8.2-11.3,21.5-18.8,36.5-18.8s28.3,7.4,36.5,18.8c5.4,7.4,8.5,16.5,8.5,26.3c0,24.8-20.2,45.1-45.1,45.1C88,446.1,68,425.8,68,401
		C68,391.2,71.2,382.1,76.5,374.7z M216.1,479.5c0,13.5-11,24.5-24.5,24.5h-157c-13.5,0-24.5-11-24.5-24.5V374.7h38.2
		c-3.3,8.1-5.2,17-5.2,26.3c0,38.6,31.4,70,70,70c38.6,0,70-31.4,70-70c0-9.3-1.9-18.2-5.2-26.3h38.2V479.5z"/>
</g>
</svg>
                  </span>
                </a>
              )}
              {footerData?.linkedin && (
                <a href={footerData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  <span className="font-bold text-2xl"><svg fill="#c2a15f" version="1.1" id="Layer_1" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	 viewBox="-143 145 512 512" xmlSpace="preserve">
<g>
	<path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7
		c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4
		c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8
		c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4
		c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"/>
	<rect x="-8.5" y="348.4" width="49.9" height="159.7"/>
	<path d="M15.4,273c-18.4,0-30.5,11.9-30.5,27.7c0,15.5,11.7,27.7,29.8,27.7h0.4c18.8,0,30.5-12.3,30.4-27.7
		C45.1,284.9,33.8,273,15.4,273z"/>
	<path d="M177.7,346.9c-28.6,0-46.5,15.6-49.8,26.6v-25.1H71.8c0.7,13.3,0,159.7,0,159.7h56.1v-86.3c0-4.9-0.2-9.7,1.2-13.1
		c3.8-9.6,12.1-19.6,27-19.6c19.5,0,28.3,14.8,28.3,36.4v82.6H241v-88.8C241,369.9,213.2,346.9,177.7,346.9z"/>
</g>
</svg></span>
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
           
            </ul>
          </div>

          {/* Contact + Map */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-gold text-lg mb-5">Visit Us</h4>
            
            <div className="text-sm text-grey space-y-5">
              {(footerData?.map || footerData?.address) && (
                <a 
                  href={footerData.map || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footerData.address || '')}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-3 hover:text-gold transition-colors"
                >
                  <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {footerData.address || 'Find us on Google Maps'}
                  </span>
                </a>
              )}
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gold" />
                <a href={`mailto:${footerData?.email || 'hello@branduntold.com'}`} className="hover:text-gold transition-colors">
                  {footerData?.email || 'hello@branduntold.com'}
                </a>
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
