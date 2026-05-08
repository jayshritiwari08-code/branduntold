export default function BlogPost({ params }: { params: { slug: string } }) {
  // This is a template - in production, you would fetch the post data based on the slug
  return (
    <article className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-6 leading-tight">
            How Airbnb Used Storytelling to Build Trust
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-grey">
            <span>By Jayshree</span>
            <span>•</span>
            <span>March 15, 2026</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-video bg-gray-900 mb-12 flex items-center justify-center text-grey border border-gray-800">
          <span>Featured Image</span>
        </div>

        {/* Content Body */}
        <div className="prose prose-lg max-w-none">
          <p className="font-sans text-lg text-grey leading-relaxed mb-6">
            In 2008, Airbnb was struggling. The founders had maxed out their credit cards, were living on cereal, and had only made $200 in their first few months. But they didn't give up. Instead, they did something that would transform their business forever—they told a story.
          </p>

          <p className="font-sans text-lg text-grey leading-relaxed mb-6">
            This isn't just a tale of startup success. It's a masterclass in how authentic storytelling can build trust, create emotional connections, and turn a struggling idea into a global phenomenon.
          </p>

          <h2 className="font-serif text-3xl font-semibold text-gold mt-12 mb-6">
            The Problem: No One Trusted Strangers
          </h2>

          <p className="font-sans text-lg text-grey leading-relaxed mb-6">
            The fundamental challenge Airbnb faced was simple but daunting: why would anyone stay in a stranger's home? The concept violated basic human instincts about safety and trust. Traditional marketing couldn't overcome this barrier.
          </p>

          <p className="font-sans text-lg text-grey leading-relaxed mb-6">
            The founders realized they needed to change the narrative. Instead of focusing on the features of their platform, they needed to focus on the human stories behind every listing.
          </p>

          <h2 className="font-serif text-3xl font-semibold text-gold mt-12 mb-6">
            The Solution: Tell the Hosts' Stories
          </h2>

          <p className="font-sans text-lg text-grey leading-relaxed mb-6">
            Airbnb began investing heavily in professional photography and storytelling. They didn't just show rooms—they showed the people who lived there. They shared the hosts' passions, their neighborhoods, and what made their spaces unique.
          </p>

          <p className="font-sans text-lg text-grey leading-relaxed mb-6">
            Each listing became a story. A musician's apartment in Brooklyn wasn't just a place to sleep—it was an invitation to experience New York through a local artist's eyes. A family home in Kyoto wasn't just accommodation—it was a chance to live like a local in ancient Japan.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-gold mt-10 mb-4">
            The Impact of Authentic Storytelling
          </h3>

          <p className="font-sans text-lg text-grey leading-relaxed mb-6">
            The results were dramatic. Bookings increased, trust was established, and Airbnb began its journey from struggling startup to a company valued at over $100 billion. The key insight was that people weren't just buying accommodation—they were buying experiences and connections.
          </p>

          <h2 className="font-serif text-3xl font-semibold text-gold mt-12 mb-6">
            Key Lessons for Your Brand
          </h2>

          <p className="font-sans text-lg text-grey leading-relaxed mb-6">
            Airbnb's success offers several important lessons for anyone building a brand:
          </p>

          <ul className="font-sans text-lg text-grey leading-relaxed list-disc list-inside space-y-3 mb-6">
            <li><strong>Trust is built through stories, not features:</strong> Technical specifications and feature lists don't create emotional connections. Stories do.</li>
            <li><strong>Show the human side:</strong> People connect with people, not faceless corporations. Put the humans behind your brand front and center.</li>
            <li><strong>Invest in quality presentation:</strong> Professional photography and well-crafted narratives signal that you care about the experience you're offering.</li>
            <li><strong>Focus on the experience, not just the product:</strong> What will people feel, learn, or discover when they engage with your brand? That's your real story.</li>
          </ul>

          <h2 className="font-serif text-3xl font-semibold text-gold mt-12 mb-6">
            Conclusion
          </h2>

          <p className="font-sans text-lg text-grey leading-relaxed mb-6">
            Airbnb didn't succeed because they had a better booking system or more features than competitors. They succeeded because they understood that in the sharing economy, trust is the currency—and storytelling is how you earn it.
          </p>

          <p className="font-sans text-lg text-grey leading-relaxed">
            Your brand, no matter what industry you're in, can apply these same principles. Find the human stories behind what you do. Tell them authentically. Build trust through genuine connection. That's how you turn strangers into loyal customers.
          </p>
        </div>

        {/* Author Bio */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-grey border border-gray-800">
              <span className="text-sm">Avatar</span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-gold mb-2">
                Written by Jayshree
              </h3>
              <p className="font-sans text-grey">
                Storyteller, writer, and brand strategist helping founders craft compelling narratives that connect with audiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
