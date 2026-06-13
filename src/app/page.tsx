import HeroSection from './components/herosection';
import AosInit from './components/aosinit';
import CategoriesCards from './components/categoriescards';
import FeaturedArticles from './components/feature-article';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  getOneFromCollectionApi, 
  getFromCollectionApi, 
  fetchAllCategories, 
  fetchAllArticles, 
  fetchStaticMeta,
  getImageUrl 
} from '@/app/lib/api';

export const revalidate = 60; // ISR: rebuild this page at most once per minute

export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchStaticMeta('');
  if (!meta) return { title: 'BrandUntold' };

  return {
    title: meta.metatitle,
    description: meta.meta_description,
    keywords: meta.meta_keyword,
  };
}

export default async function Home() {
  const [heroData, aboutData, featuredArticles, rawCategories, allHeadings, pageMeta] = await Promise.all([
    getOneFromCollectionApi('herosec'),
    getOneFromCollectionApi('about_us'),
    fetchAllArticles().then((a: any[]) => a.slice(0, 3)).catch(() => [] as any[]),
    fetchAllCategories(),
    getFromCollectionApi('all_headings'),
    fetchStaticMeta(''),
  ]);
  console.log("heroData", heroData)
  // Find the heading for the category section
  const categoryHeading = (allHeadings as any[]).find(
    (h: any) => h.section?.toLowerCase() === 'category'
  ) ?? null;

  return (
    <>
      <AosInit />
      {pageMeta?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: pageMeta.schema }}
        />
      )}
      <div className="min-h-screen">

        {/* Hero Section */}
        <HeroSection data={{ heroData }} />

        {/* Categories Overview */}
        <div data-aos="fade-up">
          {/* @ts-ignore */}
          <CategoriesCards categories={rawCategories} heading={categoryHeading} />
        </div>

        {/* Featured Articles — server-rendered, cached via ISR (revalidate 60s) */}
        <div data-aos="fade-up">
          {/* @ts-ignore — JSX component has no TS types */}
          <FeaturedArticles articles={featuredArticles} />
        </div>

        {/* About Preview */}
        <section className="relative py-24 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C2A15F_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-5 animate-slow-drift" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Image Side */}
              <div className="relative group" data-aos="fade-right">
                <div className="aspect-[3.5/4] rounded-3xl overflow-hidden border border-gold/30 shadow-2xl relative">
                  {aboutData?.image ? (
                    <Image
                      src={getImageUrl(aboutData.image, '/about1.jpg')}
                      alt={aboutData?.heading || 'Brand Untold'}
                      width={800}
                      height={900}
                      className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src="/about1.jpg"
                      alt="Brand Untold"
                      width={800}
                      height={900}
                      className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
                </div>
                <div
                  className="absolute -bottom-6 -right-6 w-44 h-44 border-2 border-gold rounded-full opacity-20 animate-pulse-slow"
                  data-aos="zoom-in"
                  data-aos-delay="400"
                />
                <div
                  className="absolute -top-8 -left-8 w-36 h-36 border border-gold/40 rounded-3xl -rotate-12 animate-float"
                  data-aos="zoom-in"
                  data-aos-delay="600"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-10" data-aos="fade-left">
                <div data-aos="fade-up" data-aos-delay="200">
                  {aboutData?.short_description ? (
                    <div
                      className="tiptap-content"
                      dangerouslySetInnerHTML={{ __html: aboutData.short_description }}
                    />
                  ) : (
                    /* Fallback skeleton shown only when aboutData is genuinely missing */
                    <div className="space-y-3">
                      <div className="h-8 bg-gray-800 animate-pulse rounded w-3/4" />
                      <div className="h-4 bg-gray-800 animate-pulse rounded w-full" />
                      <div className="h-4 bg-gray-800 animate-pulse rounded w-5/6" />
                      <div className="h-4 bg-gray-800 animate-pulse rounded w-4/6" />
                    </div>
                  )}
                </div>

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
                      <div className="absolute inset-0 w-1/2 h-full bg-white/40 skew-x-[-25deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}