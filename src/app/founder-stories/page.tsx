import Link from 'next/link';

export default function FounderStories() {
  const articles = [
    {
      title: "How Airbnb Used Storytelling to Build Trust",
      excerpt: "A deep dive into how Airbnb transformed from a struggling startup to a household name through the power of authentic storytelling.",
      date: "March 15, 2026",
      slug: "airbnb-storytelling-trust"
    },
    {
      title: "The Origin Story of Patagonia",
      excerpt: "From a small climbing equipment company to a global brand built on environmental activism and authentic values.",
      date: "March 10, 2026",
      slug: "patagonia-origin-story"
    },
    {
      title: "Sara Blakely's Journey with Spanx",
      excerpt: "How a frustrated salesperson built a billion-dollar shapewear empire with $5,000 and relentless determination.",
      date: "March 5, 2026",
      slug: "sara-blakely-spanx-journey"
    },
    {
      title: "Warby Parker's Vision for Affordable Eyewear",
      excerpt: "The story of four friends who disrupted an industry by combining social good with smart business.",
      date: "February 28, 2026",
      slug: "warby-parker-affordable-eyewear"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gold mb-4">
            Founder Stories
          </h1>
          <p className="font-sans text-lg text-grey max-w-2xl mx-auto">
            Real stories of founders and brands that built something meaningful through vision, persistence, and authentic storytelling.
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
