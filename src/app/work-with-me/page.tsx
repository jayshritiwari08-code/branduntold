export default function WorkWithMe() {
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
        style={{
        backgroundColor: '#111111',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='152' height='152' viewBox='0 0 152 152'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='temple' fill='%23333333' fill-opacity='0.1'%3E%3Cpath d='M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }}
    >
      {/* Subtle overlay to maintain readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans tracking-[3px] text-gold text-sm mb-3">LET’S CREATE SOMETHING MEANINGFUL</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight">
            Work With Me
          </h1>
          <div className="w-24 h-px bg-gold mx-auto mt-6"></div>
        </div>

        <section className="mb-16">
          <p className="font-sans text-lg text-grey leading-relaxed text-center max-w-2xl mx-auto">
            I help founders and visionary brands tell stories that matter. 
            Through deep narrative work, authentic content, and strategic storytelling, 
            I help you connect with your audience on a human level.
          </p>
        </section>

        {/* Services Section */}
        <section className="mb-20">
          <h2 className="font-serif text-3xl text-gold mb-10 text-center">Services</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-8 rounded-3xl transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)",
                border: "1px solid rgba(212,175,55,0.12)",
                boxShadow: "0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)"
              }}
            >
              <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-gold transition-colors">
                Brand Story Writing
              </h3>
              <p className="text-grey leading-relaxed">
                Uncover and craft your brand's authentic narrative — from origin story to vision, values, and emotional core.
              </p>
            </div>

            <div className="group p-8 rounded-3xl transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)",
                border: "1px solid rgba(212,175,55,0.12)",
                boxShadow: "0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)"
              }}
            >
              <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-gold transition-colors">
                Website Content
              </h3>
              <p className="text-grey leading-relaxed">
                High-converting, story-driven website copy that feels human and performs. SEO-friendly yet deeply authentic.
              </p>
            </div>

            <div className="group p-8 rounded-3xl transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)",
                border: "1px solid rgba(212,175,55,0.12)",
                boxShadow: "0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)"
              }}
            >
              <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-gold transition-colors">
                Founder Narratives
              </h3>
              <p className="text-grey leading-relaxed">
                Transform your personal journey into a compelling story that builds trust, authority, and emotional connection.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Form Section */}
        <section className="rounded-3xl p-10 md:p-12 shadow-2xl"
          style={{
            background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)",
            border: "1px solid rgba(212,175,55,0.12)",
            boxShadow: "0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)"
          }}
        >
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl text-gold mb-3">
              Let’s Tell Your Story
            </h2>
            <p className="text-grey">
              Fill out the form below or email me directly at{' '}
              <a href="mailto:hello@branduntold.com" className="text-gold hover:underline">
                hello@branduntold.com
              </a>
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-5 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors"
                  placeholder="Alex Rivera"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-5 py-4 bg-black border border-gray-700 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors"
                  placeholder="you@yourbrand.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-white mb-2">Interested Service</label>
              <select
                id="service"
                className="w-full px-5 py-4 bg-black border border-gray-700 rounded-2xl text-white focus:outline-none focus:border-gold transition-colors"
              >
                <option value="">Select a service</option>
                <option value="brand-story">Brand Story Writing</option>
                <option value="website-content">Website Content Writing</option>
                <option value="founder-narrative">Founder Narrative</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Tell me about your project</label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-5 py-4 bg-black border border-gray-700 rounded-3xl text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors resize-y"
                placeholder="What are your goals? What stage is your brand in? Any specific challenges you're facing?"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gold hover:bg-white text-black font-semibold text-lg rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}