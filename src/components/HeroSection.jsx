'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection({ heroData, heroLoading, heroImage }) {
  return (
    <section className="hero-section">
      {/* Dot grid background */}
      <div className="hero-bg-grid" aria-hidden="true" />

      {/* Thin top rule */}
      <div className="hero-top-rule" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-grid">

          {/* ── Left column ── */}
          <div className="hero-copy">
            <p className="hero-eyebrow">
              {heroLoading ? '—' : heroData?.tagline || 'Beyond12 the Brand'}
            </p>

            <h1 className="hero-heading">
              {heroLoading
                ? 'Loading…'
                : heroData?.heading || 'The Story Behind Every Brand'}
            </h1>

            <div className="hero-body">
              {heroLoading ? (
                <p className="hero-placeholder">Loading content…</p>
              ) : heroData?.description ? (
                <div
                  className="tiptap-content"
                  dangerouslySetInnerHTML={{ __html: heroData.description }}
                />
              ) : (
                <p className="tiptap-content">
                  Exploring the narratives that shape brands, founders, and
                  the art of storytelling itself.
                </p>
              )}
            </div>

            <div className="hero-rule" aria-hidden="true" />

            <div className="hero-actions">
              <Link href="/categories/founder-stories" className="btn btn-primary">
                <span>Read The Stories</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="btn-sheen" aria-hidden="true" />
              </Link>
              <Link href="/work-with-me" className="btn btn-secondary">
                <span>Work With Me</span>
                <div className="btn-sheen" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ── Right column – portrait ── */}
          <div className="hero-portrait-wrap" aria-hidden="false">
            {/* Outer decorative ring */}
            <div className="portrait-ring portrait-ring--outer" />
            {/* Inner decorative ring */}
            <div className="portrait-ring portrait-ring--inner" />

            <div className="portrait-frame">
              <Image
                src={heroData?.image || heroImage || '/placeholder.jpg'}
                alt={heroData?.heading || 'Hero portrait'}
                width={520}
                height={590}
                className="portrait-img"
                priority
              />
              {/* Gold overlay wash */}
              <div className="portrait-overlay" aria-hidden="true" />
            </div>

            {/* Floating credential badge */}
            <div className="portrait-badge">
              <span className="badge-label">Est.</span>
              <span className="badge-year">2018</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom rule */}
      <div className="hero-bottom-rule" aria-hidden="true" />

      <style>{`
        /* ─── Tokens ─────────────────────────── */
        .hero-section {
          --gold:        #C2A15F;
          --gold-light:  #e2c98a;
          --gold-dark:   #8f6d1d;
          --gold-pale:   rgba(194, 161, 95, 0.12);
          --white:       #ffffff;
          --grey-text:   #9ca3af;
          --bg:          #0a0a0a;
          --border:      rgba(194, 161, 95, 0.18);

          position: relative;
          background: var(--bg);
          overflow: hidden;
          padding: 6rem 0 7rem;
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        /* ─── Dot-grid background ────────────── */
        .hero-bg-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--gold) 0.6px, transparent 0.6px);
          background-size: 52px 52px;
          opacity: 0.07;
          pointer-events: none;
        }

        /* ─── Horizontal rules ───────────────── */
        .hero-top-rule,
        .hero-bottom-rule {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            var(--gold) 30%,
            var(--gold) 70%,
            transparent 100%
          );
          opacity: 0.25;
        }
        .hero-top-rule    { top: 0; }
        .hero-bottom-rule { bottom: 0; }

        /* ─── Layout ─────────────────────────── */
        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
          }
        }

        /* ─── Copy column ────────────────────── */
        .hero-copy {
          display: flex;
          flex-direction: column;
          gap: 0;
          animation: fadeInUp 0.9s ease both;
        }

        .hero-eyebrow {
          font-family: 'Trebuchet MS', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .hero-eyebrow::before {
          content: '';
          display: inline-block;
          width: 28px;
          height: 1px;
          background: var(--gold);
          flex-shrink: 0;
        }

        .hero-heading {
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 700;
          color: var(--white);
          line-height: 1.18;
          letter-spacing: -0.01em;
          margin: 0 0 1.75rem;
        }

        .hero-body {
          margin-bottom: 2rem;
        }
        .tiptap-content,
        .hero-placeholder {
          font-family: 'Trebuchet MS', Georgia, sans-serif;
          font-size: 1rem;
          line-height: 1.8;
          color: var(--grey-text);
          max-width: 520px;
        }

        /* ─── Divider ────────────────────────── */
        .hero-rule {
          width: 64px;
          height: 1px;
          background: linear-gradient(
            to right,
            var(--gold),
            rgba(194, 161, 95, 0.3),
            transparent
          );
          margin-bottom: 2.25rem;
          animation: expandWidth 1s 0.4s ease both;
        }
        @keyframes expandWidth {
          from { width: 0; opacity: 0; }
          to   { width: 64px; opacity: 1; }
        }

        /* ─── CTA buttons ────────────────────── */
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.875rem;
        }

        .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          font-family: 'Trebuchet MS', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border-radius: 3px;
        }
        .btn:hover {
          transform: translateY(-2px);
        }

        /* Primary */
        .btn-primary {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold-dark) 100%);
          color: #0a0a0a;
          box-shadow: 0 2px 12px rgba(194,161,95,0.25);
        }
        .btn-primary:hover {
          box-shadow: 0 4px 24px rgba(194,161,95,0.45);
        }

        /* Secondary */
        .btn-secondary {
          background: transparent;
          color: var(--gold);
          border: 1px solid var(--border);
          box-shadow: inset 0 0 0 0 var(--gold-pale);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease;
        }
        .btn-secondary:hover {
          background: var(--gold-pale);
          box-shadow: 0 4px 20px rgba(194,161,95,0.15);
        }

        /* Sheen sweep */
        .btn-sheen {
          position: absolute;
          inset: 0;
          width: 45%;
          background: rgba(255,255,255,0.35);
          transform: skewX(-20deg) translateX(-160%);
          transition: transform 0.85s ease;
          pointer-events: none;
        }
        .btn:hover .btn-sheen {
          transform: skewX(-20deg) translateX(280%);
        }

        /* ─── Portrait column ────────────────── */
        .hero-portrait-wrap {
          display: none;
          position: relative;
          justify-content: center;
          align-items: center;
          animation: fadeInUp 1s 0.15s ease both;
        }
        @media (min-width: 768px) {
          .hero-portrait-wrap {
            display: flex;
          }
        }

        /* Decorative rings */
        .portrait-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--border);
          pointer-events: none;
          animation: pulseSlow 3.5s ease-in-out infinite;
        }
        .portrait-ring--outer {
          width: 560px; height: 630px;
          animation-delay: 0s;
        }
        .portrait-ring--inner {
          width: 530px; height: 600px;
          border-style: dashed;
          opacity: 0.5;
          animation-delay: 1.75s;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.9; transform: scale(1.012); }
        }

        /* Portrait frame (oval shape) */
        .portrait-frame {
          position: relative;
          width: 440px;
          height: 500px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid rgba(194,161,95,0.3);
          box-shadow:
            0 0 0 1px rgba(194,161,95,0.1),
            0 24px 64px rgba(0,0,0,0.6),
            inset 0 0 40px rgba(0,0,0,0.4);
        }

        @media (min-width: 1280px) {
          .portrait-frame {
            width: 480px;
            height: 540px;
          }
          .portrait-ring--outer { width: 600px; height: 670px; }
          .portrait-ring--inner { width: 570px; height: 640px; }
        }

        .portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.1s ease;
        }
        .portrait-frame:hover .portrait-img {
          transform: scale(1.04);
        }

        .portrait-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(194,161,95,0.06) 0%,
            transparent 60%,
            rgba(0,0,0,0.25) 100%
          );
          pointer-events: none;
        }

        /* Floating badge */
        .portrait-badge {
          position: absolute;
          bottom: 2.5rem;
          right: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(10,10,10,0.85);
          border: 1px solid var(--border);
          backdrop-filter: blur(8px);
          gap: 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .badge-label {
          font-family: 'Trebuchet MS', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold);
          line-height: 1;
        }
        .badge-year {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--white);
          line-height: 1.2;
        }

        /* ─── Entrance animation ──────────────── */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Responsive portrait sizing ─────── */
        @media (max-width: 1100px) {
          .portrait-frame { width: 380px; height: 430px; }
          .portrait-ring--outer { width: 490px; height: 560px; }
          .portrait-ring--inner { width: 460px; height: 530px; }
        }

        @media (max-width: 900px) {
          .portrait-frame { width: 320px; height: 360px; }
          .portrait-ring--outer { width: 420px; height: 480px; }
          .portrait-ring--inner { width: 390px; height: 450px; }
        }
      `}</style>
    </section>
  );
}