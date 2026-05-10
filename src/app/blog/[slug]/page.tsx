import Link from 'next/link';
import Image from 'next/image';
import categoriesData from '@/data/categories.json';
import RecentArticlesSlider from './RecentArticlesSlider';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Find the article across all categories
  let article = null;
  let category = null;
  let categorySlug = '';

  for (const [catSlug, catData] of Object.entries(categoriesData)) {
    const foundArticle = catData.articles.find(a => a.slug === slug);
    if (foundArticle) {
      article = foundArticle;
      category = catData;
      categorySlug = catSlug;
      break;
    }
  }

  if (!article || !category) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-2xl text-white">Article not found</h1>
      </div>
    );
  }

  // Get recent articles (excluding current)
  const recentArticles = category.articles.slice(0, 3).filter(a => a.slug !== slug);

  return (
    <div
      className="min-h-screen bg-black relative overflow-hidden"
      style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="152" height="152" viewBox="0 0 152 152"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="temple" fill="%23d4af37" fill-opacity="0.06"%3E%3Cpath d="M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Subtle overlay to maintain readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative">
        {/* Banner Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-5 animate-slow-drift"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Breadcrumbs */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-grey hover:text-gold transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-gold">/</li>
                <li>
                  <Link href={`/categories/${categorySlug}`} className="text-grey hover:text-gold transition-colors">
                    {category.title}
                  </Link>
                </li>
                <li className="text-gold">/</li>
                <li className="text-gold font-medium truncate max-w-[200px]">{article.title}</li>
              </ol>
            </nav>

            {/* Banner Content */}
            <div className="text-center mb-8">
              <p className="font-sans tracking-[3px] text-gold text-sm mb-4">{category.tagline}</p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                {article.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-sm text-grey">
                <span>By Jayshree</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
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

              {/* Content Body */}
              <article className="rounded-3xl p-8 md:p-12"
                style={{
                  background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)",
                  border: "1px solid rgba(212,175,55,0.12)",
                  boxShadow: "0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)"
                }}
              >
                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6">
                  In 2008, Airbnb was struggling. The founders had maxed out their credit cards, were living on cereal, and had only made $200 in their first few months. But they didn't give up. Instead, they did something that would transform their business forever—they told a story.
                </p>

                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6">
                  This isn't just a tale of startup success. It's a masterclass in how authentic storytelling can build trust, create emotional connections, and turn a struggling idea into a global phenomenon.
                </p>

                <h2 className="font-serif text-3xl font-semibold text-gold mt-12 mb-6">
                  The Problem: No One Trusted Strangers
                </h2>

                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6">
                  The fundamental challenge Airbnb faced was simple but daunting: why would anyone stay in a stranger's home? The concept violated basic human instincts about safety and trust. Traditional marketing couldn't overcome this barrier.
                </p>

                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6">
                  The founders realized they needed to change the narrative. Instead of focusing on the features of their platform, they needed to focus on the human stories behind every listing.
                </p>

                <h2 className="font-serif text-3xl font-semibold text-gold mt-12 mb-6">
                  The Solution: Tell the Hosts' Stories
                </h2>

                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6">
                  Airbnb began investing heavily in professional photography and storytelling. They didn't just show rooms—they showed the people who lived there. They shared the hosts' passions, their neighborhoods, and what made their spaces unique.
                </p>

                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6">
                  Each listing became a story. A musician's apartment in Brooklyn wasn't just a place to sleep—it was an invitation to experience New York through a local artist's eyes. A family home in Kyoto wasn't just accommodation—it was a chance to live like a local in ancient Japan.
                </p>

                <h3 className="font-serif text-2xl font-semibold text-gold mt-10 mb-4">
                  The Impact of Authentic Storytelling
                </h3>

                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6">
                  The results were dramatic. Bookings increased, trust was established, and Airbnb began its journey from struggling startup to a company valued at over $100 billion. The key insight was that people weren't just buying accommodation—they were buying experiences and connections.
                </p>

                <h2 className="font-serif text-3xl font-semibold text-gold mt-12 mb-6">
                  Key Lessons for Your Brand
                </h2>

                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6">
                  Airbnb's success offers several important lessons for anyone building a brand:
                </p>

                <ul className="font-sans text-lg text-gray-300 leading-relaxed list-disc list-inside space-y-3 mb-6">
                  <li><strong>Trust is built through stories, not features:</strong> Technical specifications and feature lists don't create emotional connections. Stories do.</li>
                  <li><strong>Show the human side:</strong> People connect with people, not faceless corporations. Put the humans behind your brand front and center.</li>
                  <li><strong>Invest in quality presentation:</strong> Professional photography and well-crafted narratives signal that you care about the experience you're offering.</li>
                  <li><strong>Focus on the experience, not just the product:</strong> What will people feel, learn, or discover when they engage with your brand? That's your real story.</li>
                </ul>

                <h2 className="font-serif text-3xl font-semibold text-gold mt-12 mb-6">
                  Conclusion
                </h2>

                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6">
                  Airbnb didn't succeed because they had a better booking system or more features than competitors. They succeeded because they understood that in the sharing economy, trust is the currency—and storytelling is how you earn it.
                </p>

                <p className="font-sans text-lg text-gray-300 leading-relaxed">
                  Your brand, no matter what industry you're in, can apply these same principles. Find the human stories behind what you do. Tell them authentically. Build trust through genuine connection. That's how you turn strangers into loyal customers.
                </p>
              </article>

              {/* Author Bio */}
              <div className="mt-12 p-8 rounded-3xl border border-gold/20"
                style={{
                  background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)"
                }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center text-gold border-2 border-gold/30">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-gold mb-2">
                      Written by Jayshree
                    </h3>
                    <p className="font-sans text-gray-400 leading-relaxed">
                      Storyteller, writer, and brand strategist helping founders craft compelling narratives that connect with audiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Recent Articles Sidebar with 3D Slider */}
              {recentArticles.length > 0 && (
                <RecentArticlesSlider
                  articles={recentArticles}
                  categoryTitle={category.title}
                  categorySlug={categorySlug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
