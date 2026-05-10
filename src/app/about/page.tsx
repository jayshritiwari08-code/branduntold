"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <div
      className="min-h-screen bg-black relative overflow-hidden"
      style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="152" height="152" viewBox="0 0 152 152"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="temple" fill="%23d4af37" fill-opacity="0.06"%3E%3Cpath d="M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative">
        {/* Banner Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.8px,transparent_1px)] bg-[length:50px_50px] opacity-5 animate-slow-drift" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <nav className="mb-8" data-aos="fade-down">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-grey hover:text-gold transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-gold">/</li>
                <li className="text-gold font-medium">About</li>
              </ol>
            </nav>

            <div className="text-center" data-aos="fade-up">
              <p className="font-sans tracking-[3px] text-gold text-sm mb-4">THE STORY BEHIND THE WORDS</p>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                About <span className="text-gold">Brand Untold</span>
              </h1>
              <p className="font-sans text-xl text-grey max-w-2xl mx-auto">
                Uncovering the real stories behind brands and the craft of authentic storytelling
              </p>
              <div className="w-32 h-px bg-gold mx-auto mt-8" data-aos="fade-up" data-aos-delay="400" />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Hero Image + Bio Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Image Side */}
            <div className="relative group" data-aos="fade-right" data-aos-duration="1000">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-gold/30 shadow-2xl relative">
                <Image
                  src="/about1.jpg"
                  alt="Jayshree - Storyteller"
                  width={600}
                  height={750}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-44 h-44 border-2 border-gold rounded-full opacity-20 animate-pulse-slow" 
                   data-aos="zoom-in" data-aos-delay="300" />
              <div className="absolute -top-8 -left-8 w-36 h-36 border border-gold/40 rounded-3xl -rotate-12 animate-float"
                   data-aos="zoom-in" data-aos-delay="500" />
            </div>

            {/* Content Side */}
            <div className="space-y-8" data-aos="fade-left" data-aos-duration="1000">
              <section data-aos="fade-up" data-aos-delay="200">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gold mb-6 leading-tight">
                  Hello, I'm Jayshree
                </h2>
                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-4">
                  I'm a storyteller, writer, and brand strategist who believes that every great brand has a story worth telling. Through years of working with founders and businesses, I've discovered that the most powerful marketing isn't about features or benefits—it's about connection.
                </p>
                <p className="font-sans text-lg text-gray-300 leading-relaxed">
                  This platform is my way of sharing what I've learned about the art of storytelling, brand building, and creating content that truly resonates with people.
                </p>
              </section>

              <div className="w-20 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent" 
                   data-aos="fade-up" data-aos-delay="400" />

              <section data-aos="fade-up" data-aos-delay="500">
                <h3 className="font-serif text-2xl font-semibold text-white mb-4">
                  Why This Platform Exists
                </h3>
                <p className="font-sans text-lg text-gray-400 leading-relaxed mb-4">
                  I started "BRAND UNTOLD" because I noticed something missing in the world of marketing advice—authenticity. Too many resources focus on tactics and hacks without addressing the fundamental truth: people connect with stories, not sales pitches.
                </p>
                <p className="font-sans text-lg text-gray-400 leading-relaxed">
                  Here, I explore real founder stories, break down what makes narratives work, and share practical frameworks for writing and branding that you can actually apply to your own work.
                </p>
              </section>
            </div>
          </div>

          {/* Philosophy Section */}
          <section className="mb-20" data-aos="fade-up">
            <div className="rounded-3xl p-10 md:p-12"
              style={{
                background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)",
                border: "1px solid rgba(212,175,55,0.12)",
                boxShadow: "0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)"
              }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gold mb-8 text-center" data-aos="fade-up">
                My Writing Philosophy
              </h2>
              <p className="font-sans text-lg text-gray-300 leading-relaxed mb-12 text-center max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                I believe in clarity over complexity. In a world of noise, the clearest voice wins. My approach to writing and storytelling is grounded in three principles:
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { emoji: "✨", title: "Authenticity First", desc: "Real stories resonate more than manufactured ones." },
                  { emoji: "💡", title: "Simplicity Matters", desc: "Complex ideas should be explained simply." },
                  { emoji: "🤝", title: "Connection First", desc: "Build relationships first, business follows." }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group text-center p-8 border border-gold/20 rounded-3xl hover:border-gold hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10"
                    data-aos="fade-up"
                    data-aos-delay={200 + index * 150}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-4xl">{item.emoji}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-white mb-4 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12" data-aos="zoom-in" data-aos-delay="300">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gold mb-6">
              Let's Connect
            </h2>
            <p className="font-sans text-lg text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              Whether you're looking to craft your brand story, need help with content strategy, or just want to chat about storytelling, I'd love to hear from you.
            </p>
            <Link
              href="/work-with-me"
              className="inline-flex items-center px-10 py-5 bg-gold text-black font-semibold text-lg hover:bg-white transition-all duration-300 rounded-2xl group hover:scale-105 active:scale-95"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Work With Me
              <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}