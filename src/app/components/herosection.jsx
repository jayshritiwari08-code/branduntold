// src/app/components/herosection.jsx
import Image from "next/image";
import Link from "next/link";
import { getImageUrl, optimizeHtmlImages } from "@/app/lib/api";

export default function HeroSection({ data }) {
  const { heroData, loading } = data;
  console.log("heroData", heroData)
  return (
    <section className="relative min-h-[85vh] w-full flex items-center pb-16 md:pb-24 bg-black overflow-hidden">
      {/* Background Image with Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImageUrl(heroData?.image?.[0], "/home1.jpeg")}
          alt={heroData?.altname || heroData?.heading || 'Hero Background'}
          title={heroData?.img_title || heroData?.altname || heroData?.heading || 'Hero Background'}
          fill
          sizes="100vw"
          className="object-cover hidden sm:block  transition-transform duration-1000"
          priority
        />
        {/* Overlay gradient: dark on the left for text readability, fading to lighter on the right */}
        <div className="absolute inset-0 bg-black/10 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/40 lg:to-transparent"></div>
      </div>

      {/* Decorative Dot Pattern overlay */}
      <div className="absolute inset-0 opacity-15 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#C2A15F_0.8px,transparent_1px)] bg-[length:60px_60px] animate-slow-drift"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 lg:mt-20 relative z-20 w-full">
        {/* Desktop/Mobile content overlay on the left side */}
        <div className="max-w-2xl lg:max-w-3xl" data-aos="fade-right" data-aos-duration="1000">
          <p className="font-sans text-gold text-lg mb-4 tracking-wide font-medium">
            {loading ? '' : (heroData?.tagline || 'Brand Untold')}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {loading ? '' : (heroData?.heading || 'The Story Behind Every Brand')}
          </h1>

          {/* Hero Tiptap Description */}
          <div className="max-w-xl mb-8">
            {loading ? (
              <p className="text-grey text-lg">Loading content...</p>
            ) : heroData?.description ? (
              <div className="tiptap-content text-justify text-white/90" dangerouslySetInnerHTML={{ __html: optimizeHtmlImages(heroData.description) }}></div>
            ) : (
              <p className="tiptap-content text-white/90">Brand Untold explores the real decisions, struggles, and human moments behind Indian brands and founders — written for people who think beyond the highlight reel.</p>
            )}
          </div>

          <div className="w-20 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent mb-10" data-aos="fade-up" data-aos-delay="400"></div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/categories/founder-stories"
              className="px-8 py-3 bg-gradient-to-r from-gold via-yellow-200 to-[#8f6d1d] text-black font-bold hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 text-center rounded-xl group relative overflow-hidden flex items-center justify-center gap-2"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <span className="relative z-10">Read The Stories →</span>
              <div className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
            </Link>
            <Link
              href="/work-with-me"
              className="px-8 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-black font-semibold rounded-xl hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300 text-center flex items-center justify-center"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <span>Work With Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}