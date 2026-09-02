import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  getOneFromCollectionApi,
  getFromCollectionApi,
  fetchStaticMeta,
  getImageUrl,
  optimizeHtmlImages
} from '@/app/lib/api';
import AboutClient from './AboutClient';

export const revalidate = 60; // ISR: revalidate at most once every 60 seconds

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchStaticMeta('about');
  const title = meta?.metatitle || 'About Brand Untold | The Story Behind the Platform';
  const desc = meta?.meta_description || 'Brand Untold is an Indian editorial platform telling the untold stories of founders, creators, and brands — the decisions, the doubts, and the human moments that shaped everything.';
  const keywords = Array.isArray(meta?.meta_keyword)
    ? meta.meta_keyword
    : typeof meta?.meta_keyword === 'string'
      ? meta.meta_keyword.split(',').map((k: string) => k.trim())
      : ['about brand untold', 'jayshri tiwari', 'brand storytelling', 'editorial platform'];

  return {
    title,
    description: desc,
    keywords,
    alternates: {
      canonical: meta?.canonical || '/about',
    },
    openGraph: {
      title,
      description: desc,
      url: 'https://www.branduntold.in/about',
      siteName: 'Brand Untold',
      type: 'website',
    },
  };
}

// ─── Tiptap styles ───────────────────────────────────────────────────────────

const TIPTAP_STYLES = `
  .tiptap-content {
    color: #d1d5db;
    line-height: 1.8;
    font-size: 1.0625rem;
  }
  .tiptap-content h1,
  .tiptap-content h2 {
    font-family: 'Mona Sans', sans-serif !important;
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
    font-family: 'Mona Sans', sans-serif !important;
    color: #f3f4f6;
    font-weight: 600;
    line-height: 1.35;
    margin-top: 1.75rem;
    margin-bottom: 0.5rem;
  }
  .tiptap-content h3 { font-size: 1.375rem; }
  .tiptap-content h4 { font-size: 1.125rem; }
  .tiptap-content p { margin-bottom: 1.25rem; color: #d1d5db; }
  .tiptap-content p:last-child { margin-bottom: 0; }
  .tiptap-content strong, .tiptap-content b { color: #C2A15F; font-weight: 600; }
  .tiptap-content em, .tiptap-content i { color: #e5e7eb; font-style: italic; }
  .tiptap-content a {
    color: #C2A15F;
    text-decoration: underline;
    text-decoration-color: rgba(212, 175, 55, 0.4);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s ease, color 0.2s ease;
  }
  .tiptap-content a:hover { color: #f0d060; text-decoration-color: rgba(212, 175, 55, 0.8); }
  .tiptap-content blockquote {
    border-left: 3px solid #C2A15F;
    margin: 1.75rem 0;
    padding: 0.75rem 0 0.75rem 1.5rem;
    background: rgba(212, 175, 55, 0.05);
    border-radius: 0 4px 4px 0;
    font-style: italic;
    color: #e5e7eb;
  }
  .tiptap-content blockquote p { margin-bottom: 0; color: inherit; }
  .tiptap-content hr { border: none; border-top: 1px solid rgba(212, 175, 55, 0.25); margin: 2rem 0; }
  .tiptap-content ul, .tiptap-content ol { padding-left: 1.5rem; margin-bottom: 1.25rem; color: #d1d5db; }
  .tiptap-content ul { list-style-type: disc; }
  .tiptap-content ol { list-style-type: decimal; }
  .tiptap-content li { margin-bottom: 0.4rem; padding-left: 0.25rem; }
  .tiptap-content ul li::marker { color: #C2A15F; }
  .tiptap-content ol li::marker { color: #C2A15F; font-weight: 600; }
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
  .tiptap-content pre code { background: transparent; border: none; padding: 0; color: #e5e7eb; font-size: 0.875rem; }
  .table-scroll-wrapper { 
    overflow-x: auto !important; 
    -webkit-overflow-scrolling: touch !important; 
    max-width: 100% !important; 
    margin: 1.75rem 0 !important;
    scrollbar-width: thin;
    scrollbar-color: rgba(194, 161, 95, 0.4) transparent;
  }
  .table-scroll-wrapper::-webkit-scrollbar { height: 6px; }
  .table-scroll-wrapper::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); border-radius: 4px; }
  .table-scroll-wrapper::-webkit-scrollbar-thumb { background: rgba(194, 161, 95, 0.4); border-radius: 4px; }
  .tiptap-content table { 
    width: 100% !important; 
    min-width: 600px !important; 
    border-collapse: collapse !important; 
    margin: 0 !important; 
    display: table !important; 
    table-layout: auto !important;
  }
  .tiptap-content th, .tiptap-content td { 
    padding: 1rem 1.25rem !important; 
    border: 1px solid rgba(212, 175, 55, 0.2) !important; 
    color: #d1d5db; 
    font-size: 0.95rem; 
    line-height: 1.6; 
    word-break: normal !important; 
    overflow-wrap: normal !important; 
    word-wrap: normal !important; 
    white-space: normal !important; 
    vertical-align: top; 
    text-align: left; 
    min-width: 160px; 
  }
  .tiptap-content th { 
    background: rgba(212, 175, 55, 0.15) !important; 
    color: #C2A15F; 
    font-weight: 700; 
    font-family: 'Mona Sans', sans-serif !important; 
  }
  .tiptap-content tr:nth-child(even) td { background: rgba(255, 255, 255, 0.02); }
  .tiptap-content tr:hover td { background: rgba(212, 175, 55, 0.04); }
  .tiptap-content > *:first-child { margin-top: 0; }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function About() {
  const [aboutData, allHeadings, pageMeta] = await Promise.all([
    getOneFromCollectionApi('about_us'),
    getFromCollectionApi('all_headings'),
    fetchStaticMeta('about'),
  ]);

  const headings = allHeadings as any[];
  const aboutUsHeading = headings.find((h: any) => h.section?.toLowerCase() === 'about us') ?? null;
  const philosophyHeading = headings.find((h: any) => h.section?.toLowerCase() === 'about cards') ?? null;
  const ctaHeading = headings.find((h: any) => h.section?.toLowerCase() === 'cta') ?? null;

  const about = aboutData as any;

  return (
    <>
      {pageMeta?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: pageMeta.schema }}
        />
      )}
      <div
        className="min-h-screen bg-black relative overflow-hidden"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="152" height="152" viewBox="0 0 152 152"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="temple" fill="%23C2A15F" fill-opacity="0.06"%3E%3Cpath d="M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat',
        }}
      >
        {/* Client component: initialises AOS */}
        <AboutClient />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative">
          {/* Banner Section */}
          <section className="relative py-12 md:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(#C2A15F_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-5 animate-slow-drift" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <nav className="mb-8" data-aos="fade-down">
                <ol className="flex items-center space-x-2 text-sm">
                  <li>
                    <Link href="/" className="text-grey hover:text-gold transition-colors">Home</Link>
                  </li>
                  <li className="text-gold">/</li>
                  <li className="text-gold font-medium">About</li>
                </ol>
              </nav>

              <div className="text-center" data-aos="fade-up">
                <p className="font-sans tracking-[3px] text-gold text-sm mb-4">
                  {aboutUsHeading?.tagline || 'THE STORY BEHIND THE WORDS'}
                </p>
                <h1 className="text-5xl md:text-7xl font-bold text-gold leading-tight mb-6">
                  {aboutUsHeading?.heading || 'About Brand Untold'}
                </h1>
                <p className="font-sans text-xl text-grey max-w-2xl mx-auto">
                  {aboutUsHeading?.subheading || 'Uncovering the real stories behind brands and the craft of authentic storytelling'}
                </p>
                <div
                  className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-10"
                  data-aos="fade-up"
                  data-aos-delay="400"
                />
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            {/* Hero Image + Bio Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Image Side */}
              <div className="relative group" data-aos="fade-right" data-aos-duration="1000">
                <div
                  className="rounded-3xl overflow-hidden border border-gold/30 shadow-2xl relative"
                  style={{ boxShadow: '0 35px 60px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.05)' }}
                >
                  <Image
                    src={getImageUrl(about?.image, '/about1.jpg')}
                    alt={about?.altname || about?.heading || 'Jayshri Tiwari, Co-Founder of Brand Untold — Indian editorial platform for founder stories'}
                    title={about?.img_title || about?.altname || about?.heading || 'Jayshri Tiwari, Co-Founder of Brand Untold — Indian editorial platform for founder stories'}
                    width={750}
                    height={500}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
                </div>
                <div className="hidden sm:block absolute -bottom-6 -right-6 w-44 h-44 border-2 border-gold rounded-full opacity-20 animate-pulse-slow" data-aos="zoom-in" data-aos-delay="300" />
                <div className="hidden sm:block absolute -top-8 -left-8 w-36 h-36 border border-gold/40 rounded-3xl -rotate-12 animate-float" data-aos="zoom-in" data-aos-delay="500" />
              </div>

              {/* Content Side */}
              <div className="space-y-8" data-aos="fade-left" data-aos-duration="1000">
                <section data-aos="fade-up" data-aos-delay="200">
                  <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6 leading-tight">
                    {about?.heading || "Hello, I'm Jayshri"}
                  </h2>
                  <div className="font-sans text-lg text-gray-300 leading-relaxed mb-4 prose prose-lg prose-invert max-w-none">
                    {about?.description1 ? (
                      <div
                        className="tiptap-content"
                        dangerouslySetInnerHTML={{ __html: optimizeHtmlImages(about.description1, about?.altname || 'Jayshri Tiwari, Co-Founder of Brand Untold') }}
                      />
                    ) : (
                      <p>Content coming soon...</p>
                    )}
                  </div>
                </section>
                <div className="w-20 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent" data-aos="fade-up" data-aos-delay="400" />
              </div>
            </div>

            <section data-aos="fade-up" data-aos-delay="500">
              <div className="font-sans text-lg text-gray-400 leading-relaxed prose prose-lg prose-invert max-w-none">
                {about?.description2 ? (
                  <div
                    className="tiptap-content"
                    dangerouslySetInnerHTML={{ __html: optimizeHtmlImages(about.description2, 'Brand Untold Editorial Platform and Vision') }}
                  />
                ) : (
                  <p>There were no formal meetings, no rigid agendas, no hierarchy deciding whose voice mattered more. Just two minds exchanging ideas with sincerity — questioning without ego, disagreeing without dismissing, building something meaningful from a distance. Somewhere along the journey, Brand Untold was born.</p>
                )}
              </div>
            </section>

            {/* Philosophy Section */}
            <section className="mb-20 mt-16" data-aos="fade-up">
              <div
                className="rounded-3xl p-10 md:p-12"
                style={{
                  background: 'linear-gradient(160deg, #141414 0%, #0c0c0c 100%)',
                  border: '1px solid rgba(212,175,55,0.12)',
                  boxShadow: '0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)',
                }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8 text-center" data-aos="fade-up">
                  {philosophyHeading?.heading || 'Our Editorial Philosophy'}
                </h2>

                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-12 text-center max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                  {philosophyHeading?.subheading || 'We believe in depth, truth, and substance over noise. The clearest, most honest voice always endures.'}
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { title: 'Editorial Integrity', desc: "We don't write promotional features. We write honest stories." },
                    { title: 'Depth Over Volume', desc: 'One deeply researched story is worth more than ten surface-level posts.' },
                    { title: 'Stories Before Success', desc: "We tell the story before it's obvious — not after everyone already knows it." },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group text-center p-8 border border-gold/20 rounded-3xl hover:border-gold hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10"
                      data-aos="fade-up"
                      data-aos-delay={200 + index * 150}
                      style={{ background: 'rgba(20,20,20,0.6)', backdropFilter: 'blur(10px)' }}
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold group-hover:text-black text-gold transition-all duration-500 font-mono font-bold text-lg">
                        0{index + 1}
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed font-sans text-sm sm:text-base">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center py-12" data-aos="zoom-in" data-aos-delay="300">
              <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
                {ctaHeading?.heading || "Let's Connect"}
              </h2>
              <p className="font-sans text-lg text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
                {ctaHeading?.subheading || "Whether you're looking to craft your brand story, need help with content strategy, or just want to chat about storytelling, I'd love to hear from you."}
              </p>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-10" data-aos="fade-up" />

              <Link
                href="/work-with-me"
                className="px-8 py-3 bg-gradient-to-r from-gold via-yellow-200 to-[#8f6d1d] text-black rounded-lg font-bold hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 text-center group relative overflow-hidden"
                data-aos="fade-up"
                data-aos-delay="400"
                style={{ boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)' }}
              >
                Work With Us
                <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </section>
          </div>
        </div>

        {/* Tiptap Content Styles */}
        <style>{TIPTAP_STYLES}</style>
      </div>
    </>
  );
}
