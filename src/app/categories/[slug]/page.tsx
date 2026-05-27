import Link from 'next/link';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const [catRes, artRes] = await Promise.all([
    fetch(`${baseUrl}/api/data/category`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/data/articles`, { cache: 'no-store' }),
  ]);

  const catJson = await catRes.json();
  const artJson = await artRes.json();

  // ── Find current category by slug ──────────────────────────────────────────
  // Slug is derived from category heading: "Brand Strategy" → "brand-strategy"
  const category = catJson.success
    ? catJson.data.find((c: any) => {
        const cSlug = c.heading
          .trim()
          .toLowerCase()
          .replace(/ & /g, '-')
          .replace(/\s+/g, '-');
        return cSlug === slug;
      })
    : null;

  // ── Filter articles by category ID ─────────────────────────────────────────
  // article.category holds the MongoDB ObjectId string (e.g. "6a0f345f18153bfec723c178")
  // Match against category._id or category.id (whichever your API returns)
  const categoryId = category?._id ?? category?.id ?? null;

  const articles: any[] =
    artJson.success && categoryId
      ? artJson.data.filter((a: any) => a.category === categoryId)
      : artJson.success && category
      ? // Fallback: match by tagline if category ID is unavailable
        artJson.data.filter((a: any) => a.tagline === category.tagline)
      : [];

  // ── Category not found ──────────────────────────────────────────────────────
  if (!category) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl text-white font-serif mb-4">Category not found</h1>
          <Link href="/" className="text-gold hover:text-white transition-colors font-sans text-sm tracking-widest uppercase">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-black relative overflow-hidden"
      style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="152" height="152" viewBox="0 0 152 152"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="temple" fill="%23d4af37" fill-opacity="0.06"%3E%3Cpath d="M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative">
        {/* ── Banner ─────────────────────────────────────────────────────────── */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-5 animate-slow-drift" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-grey hover:text-gold transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-gold">/</li>
                <li>
                  <Link href="/#categories" className="text-grey hover:text-gold transition-colors">
                    Categories
                  </Link>
                </li>
                <li className="text-gold">/</li>
                <li className="text-gold font-medium">{category.heading}</li>
              </ol>
            </nav>

            {/* Heading */}
            <div className="text-center">
              <p className="font-sans tracking-[3px] text-gold text-sm mb-4 uppercase">
                {category.tagline}
              </p>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                {category.heading}
              </h1>
              {category.subheading && (
                <p className="font-sans text-xl text-grey max-w-2xl mx-auto">
                  {category.subheading}
                </p>
              )}
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-10" />
            </div>
          </div>
        </section>

        {/* ── Articles Grid ───────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-sans text-grey text-lg">No articles in this category yet.</p>
              <Link
                href="/"
                className="inline-block mt-6 text-gold hover:text-white font-sans text-sm tracking-widest uppercase transition-colors"
              >
                ← Browse all articles
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((article: any) => {
                // Resolve image URL (handle relative /uploads/ paths)
                const imageUrl = article.image?.startsWith('/uploads/')
                  ? `${baseUrl}${article.image}`
                  : article.image || '/blog-placeholder.jpg';

                const displayDate = article.date || article.created_at;
                const formattedDate = displayDate
                  ? new Date(displayDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : null;

                // Prefer slug for URL, fall back to id
                const articleHref = `/blog/${article.slug || article.id}`;

                return (
                  <article
                    key={article.id}
                    className="group rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
                    style={{
                      background: 'linear-gradient(160deg, #141414 0%, #0c0c0c 100%)',
                      border: '1px solid rgba(212,175,55,0.12)',
                      boxShadow:
                        '0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)',
                    }}
                  >
                    {/* Image */}
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                      {/* Tag badge */}
                      {article.tagline && (
                        <span
                          className="absolute top-4 left-4 font-sans text-[10px] font-semibold tracking-[0.18em] uppercase"
                          style={{
                            background: '#D4AF37',
                            color: '#0a0a0a',
                            padding: '4px 10px',
                          }}
                        >
                          {article.tagline}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        {formattedDate && (
                          <p className="font-sans text-sm text-gold">{formattedDate}</p>
                        )}
                        {article.author && (
                          <p className="font-sans text-xs text-gray-500">{article.author}</p>
                        )}
                      </div>

                      <h2 className="font-serif text-2xl font-semibold text-white mb-3 group-hover:text-gold transition-colors leading-snug">
                        {article.title}
                      </h2>

                      <p className="font-sans text-gray-400 mb-6 leading-relaxed line-clamp-3 text-sm">
                        {article.description}
                      </p>

                      <div className="w-16 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent mb-6" />

                      <Link
                        href={articleHref}
                        className="inline-flex items-center font-sans text-gold hover:text-white font-medium transition-colors group/link"
                      >
                        Read More
                        <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}