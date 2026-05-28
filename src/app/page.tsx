"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CategoriesCards from './components/categoriescards';
import Image from 'next/image';
import heroImage from '../../public/home1.jpeg';
import FeaturedArticles from './components/feature-article';
import { useHeroData, useAboutUsData } from './hooks';

const TIPTAP_STYLES = `
  .tiptap-content {
    color: #d1d5db;
    line-height: 1.8;
    font-size: 1.0625rem;
  }

  .tiptap-content h1,
  .tiptap-content h2 {
    font-family: 'Playfair Display', Georgia, serif;
    color: #C2A15F;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  .tiptap-content h1 { font-size: 2.25rem; }
  .tiptap-content h2 { font-size: 1.875rem; }

  .tiptap-content h3,
  .tiptap-content h4 {
    font-family: 'Playfair Display', Georgia, serif;
    color: #f3f4f6;
    font-weight: 600;
    line-height: 1.35;
    margin-top: 1.75rem;
    margin-bottom: 0.5rem;
  }

  .tiptap-content h3 { font-size: 1.375rem; }
  .tiptap-content h4 { font-size: 1.125rem; }

  .tiptap-content p {
    margin-bottom: 1.25rem;
    color: #d1d5db;
  }

  .tiptap-content p:last-child {
    margin-bottom: 0;
  }

  .tiptap-content strong,
  .tiptap-content b {
    color: #C2A15F;
    font-weight: 600;
  }

  .tiptap-content em,
  .tiptap-content i {
    color: #e5e7eb;
    font-style: italic;
  }

  .tiptap-content a {
    color: #C2A15F;
    text-decoration: underline;
    text-decoration-color: rgba(212, 175, 55, 0.4);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s ease, color 0.2s ease;
  }

  .tiptap-content a:hover {
    color: #f0d060;
    text-decoration-color: rgba(212, 175, 55, 0.8);
  }

  .tiptap-content blockquote {
    border-left: 3px solid #C2A15F;
    margin: 1.75rem 0;
    padding: 0.75rem 0 0.75rem 1.5rem;
    background: rgba(212, 175, 55, 0.05);
    border-radius: 0 4px 4px 0;
    font-style: italic;
    color: #e5e7eb;
  }

  .tiptap-content blockquote p {
    margin-bottom: 0;
    color: inherit;
  }

  .tiptap-content hr {
    border: none;
    border-top: 1px solid rgba(212, 175, 55, 0.25);
    margin: 2rem 0;
  }

  .tiptap-content ul,
  .tiptap-content ol {
    padding-left: 1.5rem;
    margin-bottom: 1.25rem;
    color: #d1d5db;
  }

  .tiptap-content ul { list-style-type: disc; }
  .tiptap-content ol { list-style-type: decimal; }

  .tiptap-content li {
    margin-bottom: 0.4rem;
    padding-left: 0.25rem;
  }

  .tiptap-content ul li::marker {
    color: #C2A15F;
  }

  .tiptap-content ol li::marker {
    color: #C2A15F;
    font-weight: 600;
  }

  .tiptap-content ul ul,
  .tiptap-content ol ol,
  .tiptap-content ul ol,
  .tiptap-content ol ul {
    margin-top: 0.4rem;
    margin-bottom: 0;
  }

  .tiptap-content code {
    background: rgba(212, 175, 55, 0.1);
    color: #C2A15F;
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 4px;
    padding: 0.15em 0.45em;
    font-size: 0.875em;
    font-family: 'Fira Code', 'Courier New', monospace;
  }

  .tiptap-content pre {
    background: #0f0f0f;
    border: 1px solid rgba(212, 175, 55, 0.15);
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    overflow-x: auto;
    margin-bottom: 1.25rem;
  }

  .tiptap-content pre code {
    background: transparent;
    border: none;
    padding: 0;
    color: #e5e7eb;
    font-size: 0.875rem;
  }

  .tiptap-content img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.25rem 0;
    border: 1px solid rgba(212, 175, 55, 0.15);
  }

  .tiptap-content table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    font-size: 0.9375rem;
  }

  .tiptap-content th {
    background: rgba(212, 175, 55, 0.1);
    color: #C2A15F;
    font-weight: 600;
    text-align: left;
    padding: 0.625rem 1rem;
    border: 1px solid rgba(212, 175, 55, 0.2);
  }

  .tiptap-content td {
    color: #d1d5db;
    padding: 0.5rem 1rem;
    border: 1px solid rgba(212, 175, 55, 0.1);
  }

  .tiptap-content tr:hover td {
    background: rgba(212, 175, 55, 0.03);
  }

  .tiptap-content > *:first-child {
    margin-top: 0;
  }
`;

export default function Home() {
  const { data: heroData, loading: heroLoading } = useHeroData();
  const { data: aboutData, loading: aboutLoading } = useAboutUsData();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });

    // Inject Tiptap styles into <head> once
    const styleId = 'tiptap-typography-styles';
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement('style');
      styleTag.id = styleId;
      styleTag.textContent = TIPTAP_STYLES;
      document.head.appendChild(styleTag);
    }

    return () => {
      // Cleanup on unmount
      const existing = document.getElementById(styleId);
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#C2A15F_0.8px,transparent_1px)] bg-[length:60px_60px] animate-slow-drift"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" data-aos-duration="1000">
              <p className="font-sans text-gold text-lg mb-4 tracking-wide">
                {heroLoading ? 'Loading...' : heroData?.tagline || 'Beyond12 the Brand'}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {heroLoading ? 'Loading...' : heroData?.heading || 'The Story Behind Every Brand'}
              </h1>

              {/* Hero Tiptap Description */}
              <div className="max-w-xl mb-8">
                {heroLoading ? (
                  <p className="text-grey text-lg">Loading content...</p>
                ) : heroData?.description ? (
                  <div
                    className="tiptap-content"
                    dangerouslySetInnerHTML={{ __html: heroData.description }}
                  />
                ) : (
                  <p className="tiptap-content">
                    Exploring the narratives that shape brands, founders, and the art of storytelling itself.
                  </p>
                )}
              </div>

              <div
                className="w-20 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent mb-10"
                data-aos="fade-up"
                data-aos-delay="400"
              ></div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/founder-stories"
                  className="px-8 py-3 bg-gradient-to-r from-gold via-yellow-200 to-[#8f6d1d] text-black font-bold hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 text-center rounded-lg group relative overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <span className="relative z-10">Read The Stories →</span>
                  <div className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                </Link>
                <Link
                  href="/work-with-me"
                  className="px-8 py-3 bg-gradient-to-r from-gold via-yellow-200 to-[#8f6d1d] text-black rounded-lg font-bold hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 text-center group relative overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <span className="relative z-10">Work With Me</span>
                  <div className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                </Link>
              </div>
            </div>

            <div className="relative hidden md:block flex justify-center" data-aos="fade-left" data-aos-duration="1100">
              <div className="relative">
                <div
                  className="relative bg-gray-900 overflow-hidden mx-auto"
                  style={{ width: '520px', height: '590px', borderRadius: '50%' }}
                >
                  <Image
                    src={heroData?.image || heroImage}
                    alt={heroData?.heading || 'Hero Image'}
                    width={520}
                    height={590}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    priority
                  />
                </div>
                <div
                  className="absolute inset-0 rounded-[50%] border border-gold/20 animate-pulse-slow pointer-events-none"
                  style={{ width: '520px', height: '590px' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <div data-aos="fade-up">
        <CategoriesCards />
      </div>

      {/* Featured Articles */}
      <div data-aos="fade-up">
        <FeaturedArticles />
      </div>

      {/* About Preview */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C2A15F_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-5 animate-slow-drift"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Image Side */}
            <div className="relative group" data-aos="fade-right">
              <div className="aspect-[3.5/4] rounded-3xl overflow-hidden border border-gold/30 shadow-2xl relative">
                {aboutLoading ? (
                  <div className="w-full h-full bg-gray-800 animate-pulse" />
                ) : (
                  <Image
                    src={aboutData?.image || '/about1.jpg'}
                    alt={aboutData?.heading || 'Brand Untold'}
                    width={800}
                    height={900}
                    className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
              </div>

              <div
                className="absolute -bottom-6 -right-6 w-44 h-44 border-2 border-gold rounded-full opacity-20 animate-pulse-slow"
                data-aos="zoom-in"
                data-aos-delay="400"
              ></div>
              <div
                className="absolute -top-8 -left-8 w-36 h-36 border border-gold/40 rounded-3xl -rotate-12 animate-float"
                data-aos="zoom-in"
                data-aos-delay="600"
              ></div>
            </div>

            {/* Text Content */}
            <div className="space-y-10" data-aos="fade-left">

              {/* About Tiptap Content */}
              <div data-aos="fade-up" data-aos-delay="200">
                {aboutLoading ? (
                  <div className="space-y-3">
                    <div className="h-8 bg-gray-800 animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-gray-800 animate-pulse rounded w-full" />
                    <div className="h-4 bg-gray-800 animate-pulse rounded w-5/6" />
                    <div className="h-4 bg-gray-800 animate-pulse rounded w-4/6" />
                  </div>
                ) : aboutData?.short_description ? (
                  <div
                    className="tiptap-content"
                    dangerouslySetInnerHTML={{ __html: aboutData.short_description }}
                  />
                ) : null}
              </div>

              {/* Divider */}
              {/* <div
                className="w-20 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent"
                data-aos="fade-up"
                data-aos-delay="400"
              ></div> */}

             

              {/* Buttons */}
              <div className="pt-8 border-t border-gold/30" data-aos="fade-up" data-aos-delay="800">
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-black font-medium transition-all duration-300 rounded-2xl group text-base md:text-lg"
                  >
                    Read My Story
                    <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                  <Link
                    href="/work-with-me"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold via-yellow-200 to-gold text-black font-bold hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 rounded-2xl text-base md:text-lg group relative overflow-hidden"
                  >
                    <span className="relative z-10">Let's Tell Yours</span>
                    <div className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}