export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gold mb-8">
          About
        </h1>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gold mb-4">
            Hello, I'm Jayshree
          </h2>
          <p className="font-sans text-lg text-grey leading-relaxed mb-4">
            I'm a storyteller, writer, and brand strategist who believes that every great brand has a story worth telling. Through years of working with founders and businesses, I've discovered that the most powerful marketing isn't about features or benefits—it's about connection.
          </p>
          <p className="font-sans text-lg text-grey leading-relaxed">
            This platform is my way of sharing what I've learned about the art of storytelling, brand building, and creating content that truly resonates with people.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gold mb-4">
            Why This Platform Exists
          </h2>
          <p className="font-sans text-lg text-grey leading-relaxed mb-4">
            I started "BRAND UNTOLD" because I noticed something missing in the world of marketing advice—authenticity. Too many resources focus on tactics and hacks without addressing the fundamental truth: people connect with stories, not sales pitches.
          </p>
          <p className="font-sans text-lg text-grey leading-relaxed">
            Here, I explore real founder stories, break down what makes narratives work, and share practical frameworks for writing and branding that you can actually apply to your own work.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gold mb-4">
            My Writing Philosophy
          </h2>
          <p className="font-sans text-lg text-grey leading-relaxed mb-4">
            I believe in clarity over complexity. In a world of noise, the clearest voice wins. My approach to writing and storytelling is grounded in three principles:
          </p>
          <ul className="font-sans text-lg text-grey leading-relaxed list-disc list-inside space-y-2">
            <li><strong>Authenticity first:</strong> Real stories resonate more than manufactured ones.</li>
            <li><strong>Simplicity matters:</strong> Complex ideas should be explained simply.</li>
            <li><strong>Connection over conversion:</strong> Build relationships first, business follows.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold text-gold mb-4">
            Let's Connect
          </h2>
          <p className="font-sans text-lg text-grey leading-relaxed mb-6">
            Whether you're looking to craft your brand story, need help with content strategy, or just want to chat about storytelling, I'd love to hear from you.
          </p>
          <a
            href="/work-with-me"
            className="inline-block px-8 py-3 bg-gold text-black font-medium hover:bg-white transition-colors"
          >
            Work With Me
          </a>
        </section>
      </div>
    </div>
  );
}
