import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import TableOfContents from '@/components/TableOfContents';
import {
  fetchArticle,
  fetchAllCategories,
  fetchAllArticles,
  getImageUrl,
  slugify,
  BASE_URL,
  Article,
  Category,
  optimizeHtmlImages
} from '@/app/lib/api';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

// Pure ISR — pages are built on first request and cached for 60 seconds.
export const revalidate = 60;
export const dynamicParams = true;

// Pre-render only a small set of high-traffic or recent articles during build (minimizes memory & build time)
export async function generateStaticParams() {
  const articles = await fetchAllArticles();
  // Pre-render top 10 articles, the rest will be generated on-demand
  return articles.slice(0, 10).map((article) => ({
    slug: article.slug,
  }));
}

// Dynamic import for the slider component to defer loading heavy client JS bundle
const RecentArticlesSlider = dynamic(() => import('./RecentArticlesSlider'), {
  ssr: true,
  loading: () => (
    <div
      className="rounded-3xl p-6 border border-[#c2a15f]/20 bg-black animate-pulse h-[450px] flex flex-col justify-between"
      style={{ background: 'linear-gradient(160deg, #141414 0%, #0c0c0c 100%)' }}
    >
      <div>
        <div className="h-4 w-1/4 bg-[#c2a15f]/20 rounded mb-3"></div>
        <div className="h-6 w-2/3 bg-gray-800 rounded mb-4"></div>
        <div className="w-16 h-px bg-[#c2a15f]/20 mt-3 mb-6"></div>
      </div>
      <div className="flex-1 bg-gray-900/40 rounded-2xl border border-gray-800/50 p-4 flex flex-col justify-between">
        <div className="aspect-video w-full bg-gray-800/50 rounded-xl"></div>
        <div className="h-3 w-1/4 bg-[#c2a15f]/10 rounded mt-4"></div>
        <div className="h-5 w-3/4 bg-gray-800/80 rounded mt-2 mb-2"></div>
      </div>
      <div className="h-10 w-full bg-[#c2a15f]/10 rounded-xl mt-6"></div>
    </div>
  )
});

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Brand Untold',
      description: 'The requested article could not be found.',
    };
  }

  const title = article.metatitle
    ? (article.metatitle.includes('Brand Untold') ? article.metatitle : `${article.metatitle} | Brand Untold`)
    : `${article.title} | Brand Untold`;

  const description = article.meta_description || article.description || `Read the full story of ${article.title} on Brand Untold.`;

  const keywords = Array.isArray(article.meta_keyword)
    ? article.meta_keyword
    : typeof article.meta_keyword === 'string'
      ? article.meta_keyword.split(',').map((k) => k.trim())
      : ['brand stories', 'founder stories', 'storytelling'];

  const imageUrl = article.image ? getImageUrl(article.image) : 'https://www.branduntold.in/logo.png';

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: article.canonical || `/articles/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.branduntold.in/articles/${slug}`,
      siteName: 'Brand Untold',
      type: 'article',
      images: [
        {
          url: imageUrl,
          alt: article.altname || article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;

  // All three fetches run in parallel — no waterfall, and they use React cache()
  const [article, categories, allArticlesSummary] = await Promise.all([
    fetchArticle(slug),
    fetchAllCategories(),
    fetchAllArticles(),
  ]);

  if (!article) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-2xl text-white">Article not found</h1>
      </div>
    );
  }

  // Resolve category by ID or tagline fallback
  const category = categories.find((c: Category) =>
    c.id === article.category ||
    c._id?.toString() === article.category ||
    c.tagline === article.tagline
  ) ?? null;
  const categorySlug = category ? slugify(category.heading) : '';

  // Recent articles from the same category, max 6, excluding current, mapped to slider structure
  const recentArticles = allArticlesSummary
    .filter((a) => {
      const categoryMatch = a.category && article.category && a.category === article.category;
      const taglineMatch = a.tagline && article.tagline && a.tagline === article.tagline;
      return (categoryMatch || taglineMatch) && a.id !== article.id;
    })
    .slice(0, 6)
    .map((a) => ({
      title: a.title ?? '',
      date: a.date
        ? new Date(a.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
        : (a.created_at
          ? new Date(a.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
          : 'Recent'),
      slug: a.slug ?? '',
      image: a.image ?? '',
      excerpt: a.description ?? '',
      altname: a.altname ?? '',
      img_title: a.img_title ?? '',
    }));

  const rawHtml = article.long_description || '';

  // Helper to extract headings (H2, H3, H4) from HTML
  const extractHeadings = (html: string) => {
    const headingRegex = /<h([2-4])([^>]*)>(.*?)<\/h\1>/gi;
    const headingsList: Array<{ level: number; text: string; id: string }> = [];
    let match;
    let index = 0;

    while ((match = headingRegex.exec(html)) !== null) {
      const level = parseInt(match[1]);
      const text = match[3].replace(/<[^>]*>/g, '').trim();
      if (text) {
        const cleanSlug = slugify(text) || `section`;
        const id = `heading-${cleanSlug}-${index++}`;
        headingsList.push({ level, text, id });
      }
    }
    return headingsList;
  };

  // Wrap tables with a scroll container to ensure reliable horizontal scrolling on mobile
  const wrapTablesForMobile = (html: string) => {
    return html.replace(
      /<table(\s[^>]*)?>[\s\S]*?<\/table>/gi,
      (table) => `<div class="tiptap-table-scroll">${table}</div>`
    );
  };

  // Helper to inject unique IDs into the heading tags
  const injectHeadingIds = (html: string) => {
    const headingRegex = /<h([2-4])([^>]*)>(.*?)<\/h\1>/gi;
    let index = 0;
    return html.replace(headingRegex, (match, level, attrs, text) => {
      const cleanText = text.replace(/<[^>]*>/g, '').trim();
      const cleanSlug = slugify(cleanText) || `section`;
      const id = `heading-${cleanSlug}-${index++}`;
      if (!attrs.includes('id=')) {
        return `<h${level} id="${id}"${attrs}>${text}</h${level}>`;
      }
      return match;
    });
  };

  const headings = extractHeadings(rawHtml);

  const processedHtml = wrapTablesForMobile(
    injectHeadingIds(rawHtml)
  );
  const hasSidebar = recentArticles.length > 0 || headings.length > 0;

  // Build JSON-LD structured schema markup for search engine optimization
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article.title,
    'description': article.description || article.meta_description,
    'image': getImageUrl(article.image),
    'datePublished': article.date || article.created_at,
    'dateModified': article.updated_at || article.date || article.created_at,
    'author': {
      '@type': 'Person',
      'name': article.author || 'Jayshri Tiwari',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Brand Untold',
      'logo': {
        '@type': 'ImageObject',
        'url': `${BASE_URL}/logo.png`,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/articles/${slug}`,
    },
  };

  return (
    <div
      className="min-h-screen bg-black relative overflow-x-clip"
      style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="152" height="152" viewBox="0 0 152 152"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="temple" fill="%23d4af37" fill-opacity="0.06"%3E%3Cpath d="M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative">
        {/* Banner */}
        <section className="relative pt-24 pb-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#c2a15f]/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-5 animate-slow-drift" />

          <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative">
            <nav className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm">
                <li>
                  <Link href="/" className="text-grey hover:text-[#c2a15f] transition-colors">
                    Home
                  </Link>
                </li>
                {category && categorySlug && (
                  <>
                    <li className="text-[#c2a15f]">/</li>
                    <li>
                      <Link
                        href={`/categories/${categorySlug}`}
                        className="text-grey hover:text-[#c2a15f] transition-colors"
                      >
                        {category.heading || 'Category'}
                      </Link>
                    </li>
                  </>
                )}
                <li className="text-[#c2a15f]">/</li>
                <li className="text-[#c2a15f] font-medium truncate max-w-[150px] sm:max-w-[200px]">
                  {article.title}
                </li>
              </ol>
            </nav>

            <div className="text-center mb-8">
              <p className="font-sans tracking-[3px] text-[#c2a15f] text-sm mb-4 uppercase">
                {article.tagline}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#c2a15f] leading-tight mb-6">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm text-grey">
                <span>By {article.author || 'Jayshri Tiwari'}</span>
                <span className="hidden sm:inline">•</span>
                <span>
                  {new Date(article.date || article.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-20 w-full overflow-hidden">
          <div
            className={`grid ${hasSidebar ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-8 w-full max-w-full min-w-0`}
          >
            <div className={`${hasSidebar ? 'lg:col-span-2' : 'lg:col-span-1'} w-full max-w-full min-w-0`}>
              {/* Featured Image */}
              <div className="aspect-video mb-8 sm:mb-12 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#c2a15f]/30 shadow-2xl relative w-full">
                <Image
                  src={getImageUrl(article.image)}
                  alt={article.altname || article.title}
                  title={article.img_title || article.altname || article.title}
                  width={1200}
                  height={675}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1200px"
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
              </div>

              {/* Mobile Table of Contents (Collapsible for mobile & tablet devices) */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-8 w-full max-w-full min-w-0">
                  <TableOfContents headings={headings} isMobile />
                </div>
              )}

              {/* Article Body */}
              <article
                className="rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 w-full max-w-full min-w-0 overflow-hidden box-border"
                style={{
                  background: 'linear-gradient(160deg, #141414 0%, #0c0c0c 100%)',
                  border: '1px solid rgba(212,175,55,0.12)',
                  boxShadow:
                    '0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)',
                }}
              >
                <style>{`
                  .tiptap-content { 
                    color:#d1d5db; 
                    font-size:1rem; 
                    line-height:1.85; 
                    width: 100%; 
                    max-width: 100%; 
                    min-width: 0; 
                    overflow-wrap: break-word; 
                    word-break: break-word; 
                  }
                  @media (min-width: 640px) {
                    .tiptap-content { font-size:1.0625rem; }
                  }
                  .tiptap-content * { 
                    max-width: 100%; 
                    box-sizing: border-box; 
                  }
                  .tiptap-content p { 
                    margin-bottom:1.35rem; 
                    color:#d1d5db; 
                    font-size:0.95rem; 
                    line-height:1.85; 
                    word-break: break-word; 
                    overflow-wrap: break-word; 
                  }
                  @media (min-width: 640px) {
                    .tiptap-content p { font-size:1.05rem; margin-bottom:1.5rem; line-height:1.9; }
                  }
                  .tiptap-content h1 { 
                    font-family:'Mona Sans',sans-serif !important; 
                    font-size:1.5rem; 
                    font-weight:700; 
                    color:#c2a15f; 
                    margin-top:2rem; 
                    margin-bottom:0.75rem; 
                    line-height:1.25; 
                    border-bottom:1px solid rgba(212,175,55,0.2); 
                    padding-bottom:0.5rem; 
                    word-break: break-word; 
                    overflow-wrap: break-word;
                  }
                  @media (min-width: 640px) {
                    .tiptap-content h1 { font-size:2.25rem; margin-top:2.5rem; margin-bottom:1rem; }
                  }
                  .tiptap-content h2 { 
                    font-family:'Mona Sans',sans-serif !important; 
                    font-size:1.25rem; 
                    font-weight:700; 
                    color:#c2a15f; 
                    margin-top:1.75rem; 
                    margin-bottom:0.75rem; 
                    line-height:1.3; 
                    word-break: break-word; 
                    overflow-wrap: break-word;
                  }
                  @media (min-width: 640px) {
                    .tiptap-content h2 { font-size:1.75rem; margin-top:2.25rem; margin-bottom:0.875rem; }
                  }
                  .tiptap-content h3 { 
                    font-family:'Mona Sans',sans-serif !important; 
                    font-size:1.1rem; 
                    font-weight:600; 
                    color:#c2a15f; 
                    margin-top:1.5rem; 
                    margin-bottom:0.6rem; 
                    line-height:1.4; 
                    word-break: break-word; 
                    overflow-wrap: break-word;
                  }
                  @media (min-width: 640px) {
                    .tiptap-content h3 { font-size:1.375rem; margin-top:2rem; margin-bottom:0.75rem; }
                  }
                  .tiptap-content h4 { 
                    font-family:'Mona Sans',sans-serif !important; 
                    font-size:1rem; 
                    font-weight:600; 
                    color:#c2a15f; 
                    margin-top:1.25rem; 
                    margin-bottom:0.5rem; 
                    word-break: break-word; 
                    overflow-wrap: break-word;
                  }
                  @media (min-width: 640px) {
                    .tiptap-content h4 { font-size:1.15rem; margin-top:1.75rem; }
                  }
                  .tiptap-content strong { color:#c2a15f; font-weight:700; }
                  .tiptap-content em { color:#b0b8c4; font-style:italic; }
                  .tiptap-content ul { list-style-type:disc; padding-left:1.25rem; margin-bottom:1.35rem; }
                  @media (min-width: 640px) {
                    .tiptap-content ul { padding-left:1.75rem; margin-bottom:1.5rem; }
                  }
                  .tiptap-content ol { list-style-type:decimal; padding-left:1.25rem; margin-bottom:1.35rem; }
                  @media (min-width: 640px) {
                    .tiptap-content ol { padding-left:1.75rem; margin-bottom:1.5rem; }
                  }
                  .tiptap-content li { margin-bottom:0.5rem; color:#d1d5db; line-height:1.75; }
                  .tiptap-content li p { margin-bottom:0.25rem; }
                  .tiptap-content blockquote { 
                    border-left:3px solid #c2a15f; 
                    padding:0.6rem 1rem; 
                    margin:1.5rem 0; 
                    background:rgba(212,175,55,0.05); 
                    border-radius:0 0.5rem 0.5rem 0; 
                    color:#b8bcc4; 
                    font-style:italic; 
                    font-size:0.95rem; 
                    word-break: break-word;
                    overflow-wrap: break-word;
                  }
                  @media (min-width: 640px) {
                    .tiptap-content blockquote { padding:0.75rem 1.5rem; margin:2rem 0; font-size:1.1rem; }
                  }
                  .tiptap-content a { 
                    color:#c2a15f; 
                    text-decoration:underline; 
                    text-underline-offset:3px; 
                    transition:color 0.2s; 
                    word-break: break-word !important; 
                    overflow-wrap: anywhere !important; 
                  }
                  .tiptap-content a:hover { color:#d4af37; }
                  .tiptap-content code { background:rgba(212,175,55,0.08); color:#c2a15f; padding:0.15rem 0.45rem; border-radius:0.25rem; font-family:'Courier New',monospace; font-size:0.9em; border:1px solid rgba(212,175,55,0.15); word-break: break-word; }
                  .tiptap-content pre { background:rgba(0,0,0,0.5); border:1px solid rgba(212,175,55,0.15); border-radius:0.75rem; padding:0.875rem 1rem; overflow-x:auto; max-width:100%; margin:1.25rem 0; -webkit-overflow-scrolling: touch; }
                  @media (min-width: 640px) {
                    .tiptap-content pre { padding:1.25rem 1.5rem; margin:1.5rem 0; }
                  }
                  .tiptap-content pre code { background:none; border:none; padding:0; color:#d1d5db; font-size:0.9rem; }
                  .tiptap-content hr { border:none; border-top:1px solid rgba(212,175,55,0.2); margin:2rem 0; }
                  
                  /* Image styling: Force block display and 100% max width without horizontal margin leaks */
                  .tiptap-content img { 
                    border-radius:0.75rem; 
                    display: block !important;
                    width:100% !important; 
                    max-width:100% !important; 
                    height:auto !important; 
                    margin:1.5rem 0 !important; 
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                    box-sizing: border-box !important;
                    object-fit: contain;
                  }
                  
                  /* Table styling: Same layout as desktop with smooth horizontal scroll on mobile */
                  /* ================================
   TIPTAP RESPONSIVE TABLE
   ================================ */

.tiptap-content .tiptap-table-scroll {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  margin: 1.5rem 0;
  border-radius: 0.75rem;

  /* Better scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(194, 161, 95, 0.5) rgba(255, 255, 255, 0.05);
}

/* Chrome / Edge / Safari */
.tiptap-content .tiptap-table-scroll::-webkit-scrollbar {
  height: 6px;
}

.tiptap-content .tiptap-table-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
}

.tiptap-content .tiptap-table-scroll::-webkit-scrollbar-thumb {
  background: rgba(194, 161, 95, 0.5);
  border-radius: 999px;
}

.tiptap-content .tiptap-table-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(194, 161, 95, 0.8);
}

/* Table itself */
.tiptap-content .tiptap-table-scroll table {
  width: max-content !important;
  min-width: 600px !important;
  max-width: none !important;

  border-collapse: collapse !important;
  border-spacing: 0;
  margin: 0 !important;

  table-layout: auto !important;
}

/* Cells */
.tiptap-content .tiptap-table-scroll th,
.tiptap-content .tiptap-table-scroll td {
  min-width: 150px;
  padding: 0.75rem 1rem !important;

  border: 1px solid rgba(212, 175, 55, 0.2) !important;

  color: #d1d5db !important;
  font-size: 0.875rem !important;
  line-height: 1.6 !important;

  text-align: left !important;
  vertical-align: top !important;

  white-space: normal !important;
  word-break: normal !important;
  overflow-wrap: break-word !important;
}

/* Header */
.tiptap-content .tiptap-table-scroll th {
  background: rgba(212, 175, 55, 0.15) !important;
  color: #c2a15f !important;

  font-family: Georgia, serif !important;
  font-weight: 700 !important;
}

/* Alternating rows */
.tiptap-content .tiptap-table-scroll tr:nth-child(even) td {
  background: rgba(255, 255, 255, 0.02) !important;
}

/* Hover */
.tiptap-content .tiptap-table-scroll tr:hover td {
  background: rgba(212, 175, 55, 0.04) !important;
}

/* Mobile */
@media (max-width: 639px) {
  .tiptap-content .tiptap-table-scroll {
    margin-left: 0;
    margin-right: 0;

    /* Gives clear indication that table can scroll */
    padding-bottom: 4px;
  }

  .tiptap-content .tiptap-table-scroll table {
    min-width: 650px !important;
  }

  .tiptap-content .tiptap-table-scroll th,
  .tiptap-content .tiptap-table-scroll td {
    min-width: 150px;
    padding: 0.7rem 0.85rem !important;
    font-size: 0.8rem !important;
    line-height: 1.5 !important;
  }
}

/* Desktop */
@media (min-width: 640px) {
  .tiptap-content .tiptap-table-scroll th,
  .tiptap-content .tiptap-table-scroll td {
    min-width: 160px;
    padding: 1rem 1.25rem !important;
    font-size: 0.95rem !important;
  }
}
                  .tiptap-content tr:nth-child(even) td { background: rgba(255,255,255,0.02) !important; }
                  .tiptap-content tr:hover td { background: rgba(212,175,55,0.04) !important; }
                `}</style>

                {/* Optimised rendering of large content by writing HTML output directly without virtual DOM component overhead */}
                <div
                  className="tiptap-content"
                  dangerouslySetInnerHTML={{ __html: optimizeHtmlImages(processedHtml, article.altname || article.title || 'Brand Untold editorial story') }}
                />
              </article>

              {/* Author Bio */}
              <div
                className="mt-12 p-6 sm:p-8 rounded-3xl border border-[#c2a15f]/20"
                style={{ background: 'linear-gradient(160deg, #141414 0%, #0c0c0c 100%)' }}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
                  <div className="w-20 h-20 shrink-0 rounded-full bg-[#c2a15f]/10 flex items-center justify-center text-[#c2a15f] border-2 border-[#c2a15f]/30">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#c2a15f] mb-2">
                      Written by {article.author || 'Jayshri Tiwari'}
                    </h3>
                    <p className="font-sans text-gray-400 leading-relaxed">
                      {article.author_bio ||
                        'Storyteller, writer, and brand strategist helping founders craft compelling narratives that connect with audiences.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar container */}
            {hasSidebar && (
              <div className="lg:col-span-1 relative">
                {/* Recent Articles Slider */}
                {recentArticles.length > 0 && (
                  <div className="mb-8">
                    <RecentArticlesSlider
                      articles={recentArticles}
                      categoryTitle={category?.heading || 'Recent'}
                      categorySlug={categorySlug}
                    />
                  </div>
                )}

                {/* Table of Contents - Sticky wrapper */}
                {headings.length > 0 && (
                  <div className="hidden lg:block lg:sticky lg:top-28 h-fit">
                    <TableOfContents headings={headings} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}