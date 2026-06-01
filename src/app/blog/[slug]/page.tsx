import Link from 'next/link';
import Image from 'next/image';
import RecentArticlesSlider from './RecentArticlesSlider';
import { Metadata } from 'next';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

async function getArticleData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://branduntold.in';
  try {
    const res = await fetch(`${baseUrl}/api/data/articles?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
    const artJson = await res.json();
    
    if (artJson.success) {
      // API returns single article or array — handle both shapes
      return Array.isArray(artJson.data) ? artJson.data[0] : artJson.data;
    }
  } catch (error) {
    console.error(`Failed to fetch article data for slug ${slug}:`, error);
  }
  return null;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  console.log("Generating metadata for slug:", slug);
  const article = await getArticleData(slug);
console.log("Metadata generation - article data:", article);
  if (!article) {
    return {
      title: 'Article Not Found - Brand Untold',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: article.metatitle || article.title,
    description: article.meta_description || article.description,
    keywords: article.meta_keyword || [],
    // You can add more meta tags here, e.g., Open Graph, Twitter cards
    // openGraph: {
    //   images: [article.image],
    // },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://branduntold.in'; // Re-declare for component scope

  const [artRes, catRes] = await Promise.all([
    fetch(`${baseUrl}/api/data/articles?slug=${slug}`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/data/category`, { cache: 'no-store' })
  ]);

  const artJson = await artRes.json();
  const catJson = await catRes.json();
  console.log("Article fetch response:", artJson);
  // API returns single article or array — handle both shapes
  const article = artJson.success
    ? (Array.isArray(artJson.data) ? artJson.data[0] : artJson.data)
    : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-2xl text-white">Article not found</h1>
      </div>
    );
  }

  const category = catJson.success
    ? catJson.data.find((c: any) => c.tagline === article.tagline)
    : null;
  const categorySlug = category
    ? category.heading.trim().toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')
    : '';

  // Fetch recent articles from same category (still needs full list)
  const recentRes = await fetch(`${baseUrl}/api/data/articles`, { cache: 'no-store' });
  const recentJson = await recentRes.json();
  const recentArticles = recentJson.success
    ? recentJson.data.filter((a: any) => a.tagline === article.tagline && a.id !== article.id).slice(0, 3)
    : [];

  return (
    <div
      className="min-h-screen bg-black relative overflow-hidden"
      style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="152" height="152" viewBox="0 0 152 152"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="temple" fill="%23d4af37" fill-opacity="0.06"%3E%3Cpath d="M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative">
        {/* Banner Section */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-5 animate-slow-drift"></div>

          <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative">
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-grey hover:text-gold transition-colors">Home</Link>
                </li>
                <li className="text-gold">/</li>
                <li>
                  <Link href={`/articles/${categorySlug}`} className="text-grey hover:text-gold transition-colors">
                    {category?.heading || 'Category'}
                  </Link>
                </li>
                <li className="text-gold">/</li>
                <li className="text-gold font-medium truncate max-w-[200px]">{article.title}</li>
              </ol>
            </nav>

            <div className="text-center mb-8">
              <p className="font-sans tracking-[3px] text-gold text-sm mb-4 uppercase">{article.tagline}</p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-gold leading-tight mb-6">
                {article.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-sm text-grey">
                <span>By {article.author || 'Jayshree'}</span>
                <span>•</span>
                <span>
                  {new Date(article.date || article.created_at).toLocaleDateString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className={`grid ${recentArticles.length > 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-8`}>
            <div className={recentArticles.length > 0 ? 'lg:col-span-2' : 'lg:col-span-1'}>
              {/* Featured Image */}
              <div className="aspect-video mb-12 rounded-3xl overflow-hidden border border-gold/30 shadow-2xl relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
              </div>

              {/* ✅ TipTap Content Body */}
              <article
                className="rounded-3xl p-8 md:p-12"
                style={{
                  background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)",
                  border: "1px solid rgba(212,175,55,0.12)",
                  boxShadow: "0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)"
                }}
              >
                {/* TipTap Typography Styles */}
                <style>{`
                  .tiptap-content {
                    color: #d1d5db;
                  
                    font-size: 1.125rem;
                    line-height: 1.85;
                  }
                  .tiptap-content p {
                    margin-bottom: 1.5rem;
                    color: #d1d5db;
                    font-size: 1.05rem;
                    line-height: 1.9;
                  }
                  .tiptap-content h1 {
                    font-family: Georgia, serif;
                    font-size: 2.25rem;
                    font-weight: 700;
                    color: #c2a15f;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                    line-height: 1.25;
                    border-bottom: 1px solid rgba(212,175,55,0.2);
                    padding-bottom: 0.5rem;
                  }
                  .tiptap-content h2 {
                    font-family: Georgia, serif;
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #c2a15f;
                    margin-top: 2.25rem;
                    margin-bottom: 0.875rem;
                    line-height: 1.3;
                  }
                  .tiptap-content h3 {
                    font-family: Georgia, serif;
                    font-size: 1.375rem;
                    font-weight: 600;
                    color: #d6b20f;
                    margin-top: 2rem;
                    margin-bottom: 0.75rem;
                    line-height: 1.4;
                  }
                  .tiptap-content h4 {
                    font-family: Georgia, serif;
                    font-size: 1.15rem;
                    font-weight: 600;
                    color: #e4c84a;
                    margin-top: 1.75rem;
                    margin-bottom: 0.5rem;
                  }
                  .tiptap-content strong {
                    color: #dfbe45;
                    font-weight: 700;
                  }
                  .tiptap-content em {
                    color: #b0b8c4;
                    font-style: italic;
                  }
                  .tiptap-content ul {
                    list-style-type: disc;
                    padding-left: 1.75rem;
                    margin-bottom: 1.5rem;
                    space-y: 0.5rem;
                  }
                  .tiptap-content ol {
                    list-style-type: decimal;
                    padding-left: 1.75rem;
                    margin-bottom: 1.5rem;
                  }
                  .tiptap-content li {
                    margin-bottom: 0.6rem;
                    color: #d1d5db;
                    line-height: 1.75;
                  }
                  .tiptap-content li p {
                    margin-bottom: 0.25rem;
                  }
                  .tiptap-content blockquote {
                    border-left: 3px solid #d4af37;
                    padding: 0.75rem 1.5rem;
                    margin: 2rem 0;
                    background: rgba(212,175,55,0.05);
                    border-radius: 0 0.5rem 0.5rem 0;
                    color: #b8bcc4;
                    font-style: italic;
                    font-size: 1.1rem;
                  }
                  .tiptap-content a {
                    color: #c2a15f;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                    transition: color 0.2s;
                  }
                  .tiptap-content a:hover {
                    color: #f0d060;
                  }
                  .tiptap-content code {
                    background: rgba(212,175,55,0.08);
                    color: #c2a15f;
                    padding: 0.15rem 0.45rem;
                    border-radius: 0.25rem;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9em;
                    border: 1px solid rgba(212,175,55,0.15);
                  }
                  .tiptap-content pre {
                    background: rgba(0,0,0,0.5);
                    border: 1px solid rgba(212,175,55,0.15);
                    border-radius: 0.75rem;
                    padding: 1.25rem 1.5rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                  }
                  .tiptap-content pre code {
                    background: none;
                    border: none;
                    padding: 0;
                    color: #d1d5db;
                    font-size: 0.9rem;
                  }
                  .tiptap-content hr {
                    border: none;
                    border-top: 1px solid rgba(212,175,55,0.2);
                    margin: 2.5rem 0;
                  }
                  .tiptap-content img {
                    border-radius: 0.75rem;
                    max-width: 100%;
                    margin: 1.5rem 0;
                  }
                  .tiptap-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.5rem 0;
                  }
                  .tiptap-content th {
                    background: rgba(212,175,55,0.1);
                    color: #c2a15f;
                    font-weight: 600;
                    padding: 0.75rem 1rem;
                    text-align: left;
                    border: 1px solid rgba(212,175,55,0.2);
                  }
                  .tiptap-content td {
                    padding: 0.75rem 1rem;
                    border: 1px solid rgba(255,255,255,0.07);
                    color: #d1d5db;
                  }
                  .tiptap-content tr:nth-child(even) td {
                    background: rgba(255,255,255,0.02);
                  }
                `}</style>

                <div
                  className="tiptap-content"
                  dangerouslySetInnerHTML={{ __html: article.long_description }}
                />
              </article>

              {/* Author Bio */}
              <div
                className="mt-12 p-8 rounded-3xl border border-gold/20"
                style={{ background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)" }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center text-gold border-2 border-gold/30">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-gold mb-2">
                      Written by {article.author || 'Jayshree'}
                    </h3>
                    <p className="font-sans text-gray-400 leading-relaxed">
                      {article.author_bio || 'Storyteller, writer, and brand strategist helping founders craft compelling narratives that connect with audiences.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            {recentArticles.length > 0 && (
              <div className="lg:col-span-1">
                <RecentArticlesSlider
                  articles={recentArticles}
                  categoryTitle={category?.heading || 'Recent'}
                  categorySlug={categorySlug}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}