import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black  border-t border-gold mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Logo + Description */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="BRAND UNTOLD"
                width={50}
                height={50}
                className="h-24 w-auto"
              />
            
            </div>
            
            <p className="text-grey text-[15px] leading-relaxed max-w-md">
              A platform dedicated to uncovering the real stories behind brands and founders — 
              the thinking, the risks, the turning points, and the craft of storytelling.
            </p>

            <div className="mt-8 flex gap-6 text-xl">
              {/* Add your social icons here */}
              <a href="#" className="hover:text-gold transition-colors">𝕏</a>
              <a href="#" className="hover:text-gold transition-colors">IG</a>
              <a href="#" className="hover:text-gold transition-colors">LI</a>
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-gold text-lg mb-5">Categories</h4>
            <ul className="space-y-3 text-grey">
              <li>
                <Link href="/founder-stories" className="hover:text-gold transition-colors">
                  Founder Stories
                </Link>
              </li>
              <li>
                <Link href="/story-breakdowns" className="hover:text-gold transition-colors">
                  Story Breakdowns
                </Link>
              </li>
              <li>
                <Link href="/writing-branding" className="hover:text-gold transition-colors">
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
            
            <div className="text-sm text-grey space-y-1 mb-6">
              <p>123 Story Avenue</p>
              <p>New York, NY 10001</p>
              <p className="pt-2">hello@branduntold.com</p>
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