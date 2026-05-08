import Link from 'next/link';

export default function StoryBreakdowns() {
  const articles = [
    {
      title: "The Hero's Journey in Modern Branding",
      excerpt: "Understanding how ancient narrative structures apply to contemporary brand storytelling strategies.",
      date: "March 12, 2026",
      slug: "heros-journey-modern-branding"
    },
    {
      title: "Why Emotional Storytelling Sells",
      excerpt: "The psychology behind emotional connections in marketing and how to leverage them ethically.",
      date: "March 8, 2026",
      slug: "emotional-storytelling-sells"
    },
    {
      title: "The Power of Vulnerability in Brand Stories",
      excerpt: "How showing vulnerability creates deeper connections with audiences and builds authentic trust.",
      date: "March 3, 2026",
      slug: "power-vulnerability-brand-stories"
    },
    {
      title: "Storytelling Frameworks That Actually Work",
      excerpt: "A practical guide to proven narrative frameworks you can apply to your brand communication.",
      date: "February 25, 2026",
      slug: "storytelling-frameworks-work"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gold mb-4">
            Story Breakdowns
          </h1>
          <p className="font-sans text-lg text-grey max-w-2xl mx-auto">
            Analytical articles explaining why certain stories work and how to craft compelling narratives for your brand.
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
