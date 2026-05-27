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
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.8px,transparent_1px)] bg-[length:60px_60px] animate-slow-drift"></div>
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
              <div className="font-sans text-lg text-grey max-w-xl mb-8 leading-relaxed prose prose-lg prose-invert">
                {heroLoading ? 'Loading content...' : heroData?.description ? (
                  <div dangerouslySetInnerHTML={{ __html: heroData.description }} className="[&>p]:mb-4 last:[&>p]:mb-0" />
                ) : 'Exploring the narratives that shape brands, founders, and the art of storytelling itself.'}
              </div>
              <div className="w-20 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent mb-10"
                data-aos="fade-up" data-aos-delay="400"></div>
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
                <div className="relative bg-gray-900 overflow-hidden mx-auto"
                  style={{ width: '520px', height: '590px', borderRadius: '50%' }}>
                  <Image
                    src={heroData?.image || heroImage}
                    alt={heroData?.heading || 'Hero Image'}
                    width={520}
                    height={590}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    priority
                  />
                </div>
                <div className="absolute inset-0 rounded-[50%] border border-gold/20 animate-pulse-slow pointer-events-none"
                  style={{ width: '520px', height: '590px' }}></div>
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
  <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-5 animate-slow-drift"></div>

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

        <div className="absolute -bottom-6 -right-6 w-44 h-44 border-2 border-gold rounded-full opacity-20 animate-pulse-slow" data-aos="zoom-in" data-aos-delay="400"></div>
        <div className="absolute -top-8 -left-8 w-36 h-36 border border-gold/40 rounded-3xl -rotate-12 animate-float" data-aos="zoom-in" data-aos-delay="600"></div>
      </div>

      {/* Text Content */}
      <div className="space-y-10" data-aos="fade-left">

        {/* Tiptap Editor Content - Improved Typography */}
   {/* Tiptap Editor Content - Fixed Typography */}
<div data-aos="fade-up" data-aos-delay="200">
  {aboutLoading ? (
    <div className="space-y-3"> {/* skeleton */} </div>
  ) : (
    aboutData?.short_description ? (
      <div
        className="prose prose-lg prose-invert max-w-none 
          prose-headings:font-serif
          
          /* h2 styling */
          prose-h2:font-playfair-display prose-h2:text-gold prose-h2:text-4xl 
          prose-h2:tracking-tighter prose-h2:mb-6 prose-h2:leading-tight
          
          /* Force style even if <strong> is inside h2 */
          prose-h2 strong:text-gold prose-h2 strong:font-bold

          /* h4 styling */
          prose-h4:text-gray-100 prose-h4:text-xl prose-h4:font-medium 
          prose-h4:mb-5 prose-h4:leading-snug

          /* Paragraphs */
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6

          /* Strong tags anywhere */
          prose-strong:text-gold prose-strong:font-semibold
        "
        dangerouslySetInnerHTML={{ __html: aboutData.short_description }}
      />
    ) : null
  )}
</div>

        {/* Divider after Tiptap Content */}
        <div className="w-20 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent my-8"
          data-aos="fade-up" data-aos-delay="400"></div>

        {/* Hardcoded Sections with same style */}
        <div data-aos="fade-up" data-aos-delay="500">
          <h4 className="font-serif text-2xl text-gold mb-3">
            Is There a Story Only You Can Tell?
          </h4>
        </div>

        {/* Last h4 + Divider */}
        <div data-aos="fade-up" data-aos-delay="700">
          <h4 className="font-serif text-2xl text-gold mb-3">
            Ready to Share Your Story?
          </h4>
        </div>

        {/* Buttons with Border Above */}
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