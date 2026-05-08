import Link from 'next/link';

export default function WritingBranding() {
  const articles = [
    {
      title: "How to Write a Brand Story That Connects",
      excerpt: "A step-by-step guide to crafting a brand narrative that resonates with your target audience.",
      date: "March 14, 2026",
      slug: "write-brand-story-connects"
    },
    {
      title: "SEO Storytelling: Ranking with Authentic Content",
      excerpt: "Balancing SEO best practices with authentic storytelling to create content that ranks and connects.",
      date: "March 9, 2026",
      slug: "seo-storytelling-ranking"
    },
    {
      title: "The Art of Writing Compelling About Pages",
      excerpt: "Transform your About page from a boring bio into a powerful storytelling tool that converts visitors.",
      date: "March 4, 2026",
      slug: "writing-compelling-about-pages"
    },
    {
      title: "Brand Voice: Finding and Refining Your Tone",
      excerpt: "Practical exercises to discover your brand's unique voice and maintain consistency across all channels.",
      date: "February 27, 2026",
      slug: "brand-voice-finding-refining"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gold mb-4">
            Writing & Branding
          </h1>
          <p className="font-sans text-lg text-grey max-w-2xl mx-auto">
            SEO articles with guides, tips, and frameworks for effective writing and brand communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article key={article.slug} className="bg-gray-900 p-6 border border-gray-800 hover:border-gold transition-colors">
              <div className="aspect-video bg-gray-800 mb-4 flex items-center justify-center text-grey">
                <span className="text-sm">Featured Image</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-white mb-3">
                {article.title}
              </h2>
              <p className="font-sans text-sm text-grey mb-2">{article.date}</p>
              <p className="font-sans text-grey mb-4">
                {article.excerpt}
              </p>
              <Link
                href={`/blog/${article.slug}`}
                className="font-sans text-gold hover:text-white font-medium"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
