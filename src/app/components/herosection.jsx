// src/app/components/herosection.jsx
import Image from "next/image";
import Link from "next/link";
// Removed invalid import; using public path directly

export default function HeroSection({ data }) {
  const { heroData, loading } = data;
  return (
    <section className="py-10 md:py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#C2A15F_0.8px,transparent_1px)] bg-[length:60px_60px] animate-slow-drift"></div>
      </div>

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative">
        <div className="lg:flex block gap-12 items-center">
          {/* Mobile image */}
          <div className="relative lg:hidden block flex justify-center" data-aos="fade-left" data-aos-duration="1100">
            <div className="relative">
              <div className="relative bg-gray-900 overflow-hidden mx-auto" style={{ width: '520px', height: '590px', borderRadius: '50%' }}>
                <Image
                  src={heroData?.image || "/home1.jpeg"}
                  alt={heroData?.heading || 'Hero Image'}
                  width={520}
                  height={590}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-[50%] border border-gold/20 animate-pulse-slow pointer-events-none" style={{ width: '520px', height: '590px' }}></div>
            </div>
          </div>

          {/* Desktop content */}
          <div data-aos="fade-right" data-aos-duration="1000">
            <p className="font-sans text-gold text-lg mb-4 mt-12 lg:mt-0 tracking-wide">
              {loading ? 'Loading...' : heroData?.tagline || 'Beyond12 the Brand'}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:6xl font-bold text-white mb-6 leading-tight">
              {loading ? 'Loading...' : heroData?.heading || 'The Story Behind Every Brand'}
            </h1>

            {/* Hero Tiptap Description */}
            <div className="max-w-3xl mb-8">
              {loading ? (
                <p className="text-grey text-lg">Loading content...</p>
              ) : heroData?.description ? (
                <div className="tiptap-content text-justify" dangerouslySetInnerHTML={{ __html: heroData.description }}></div>
              ) : (
                <p className="tiptap-content">Exploring the narratives that shape brands, founders, and the art of storytelling itself.</p>
              )}
            </div>

            <div className="w-20 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent mb-10" data-aos="fade-up" data-aos-delay="400"></div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/categories/founder-stories"
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
                <span className="relative z-10">Work With Us</span>
                <div className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
              </Link>
            </div>
          </div>

          {/* Desktop image */}
          <div className="relative hidden lg:block flex justify-center" data-aos="fade-left" data-aos-duration="1100">
            <div className="relative">
              <div className="relative bg-gray-900 overflow-hidden mx-auto" style={{ width: '520px', height: '590px', borderRadius: '50%' }}>
                <Image
                  src={heroData?.image || "/home1.jpeg"}
                  alt={heroData?.heading || 'Hero Image'}
                  width={520}
                  height={590}
                  className="lg:w-full lg:h-full object-cover transition-transform duration-1000 hover:scale-105"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-[50%] border border-gold/20 animate-pulse-slow pointer-events-none" style={{ width: '520px', height: '590px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}