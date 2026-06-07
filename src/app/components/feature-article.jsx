"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Card3D({ article, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const img = imgRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025,1.025,1.025)`;
    glow.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(212,175,55,0.15), transparent 65%)`;
    if (img) img.style.transform = `scale(1.06) translate(${(x - cx) * 0.012}px, ${(y - cy) * 0.012}px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const img = imgRef.current;
    if (!card || !glow) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    glow.style.background = "transparent";
    if (img) img.style.transform = "scale(1) translate(0,0)";
  };

  const isLarge = index === 0;

  // Resolve image URL (handle relative /uploads/ paths)
  // Use same-origin URL, rewrite will handle proxying to admin.branduntold.in
  const imageUrl = article.image || '/blog-placeholder.jpg';

  // Use tagline as the tag label (strip leading/trailing whitespace)
  const tag = article.category_label || article.tagline || "Article";

  // Format date
  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : null;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-aos="fade-up"
      data-aos-delay={index * 120}
      data-aos-duration="800"
      style={{
        transition: "transform 0.12s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
        position: "relative",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {/* Glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "4px",
          pointerEvents: "none",
          zIndex: 4,
          transition: "background 0.12s ease",
        }}
      />

      <article
        style={{
          background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid rgba(212,175,55,0.12)",
          boxShadow: "0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            height: isLarge ? "300px" : "280px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div
            ref={imgRef}
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: imageUrl ? `url(${imageUrl})` : "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 0.15s ease-out",
              objectFit: "cover",
              repeat: "no-repeat",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
            }}
          />
         
          {article.author && (
            <div style={{ position: "absolute", bottom: "14px", right: "14px", zIndex: 2 }}>
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.06em",
                }}
              >
                {article.author}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            transform: "translateZ(18px)",
            transformStyle: "preserve-3d",
          }}
        >
          {formattedDate && (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                color: "#D4AF37",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              {formattedDate}
            </p>
          )}

          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isLarge ? "1.3rem" : "1.1rem",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "0.75rem",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
            }}
          >
            {article.title}
          </h3>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#6b7280",
              lineHeight: 1.7,
              fontSize: "0.9rem",
              flex: 1,
              marginBottom: "1.25rem",
              // Clamp to ~3 lines
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(212,175,55,0.1)",
              paddingTop: "1rem",
            }}
          >
            <Link
              href={`/articles/${article.slug || article.id}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#D4AF37",
                fontWeight: 500,
                fontSize: "0.88rem",
                textDecoration: "none",
                letterSpacing: "0.04em",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "gap 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "#fff";
                el.style.gap = "10px";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "#D4AF37";
                el.style.gap = "6px";
              }}
            >
              Read More <span style={{ fontSize: "1rem" }}>→</span>
            </Link>
            <div
              style={{
                height: "1px",
                width: "40px",
                background: "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)",
              }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}

// Skeleton card shown while loading
function SkeletonCard({ index }) {
  const isLarge = index === 0;
  return (
    <div
      style={{
        borderRadius: "4px",
        overflow: "hidden",
        border: "1px solid rgba(212,175,55,0.08)",
        background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)",
        animation: "pulse 1.8s ease-in-out infinite",
      }}
    >
      <div
        style={{
          height: isLarge ? "260px" : "200px",
          background: "rgba(255,255,255,0.04)",
        }}
      />
      <div style={{ padding: "1.5rem" }}>
        <div style={{ height: "12px", width: "60px", background: "rgba(212,175,55,0.15)", borderRadius: "2px", marginBottom: "0.75rem" }} />
        <div style={{ height: "20px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", marginBottom: "0.5rem" }} />
        <div style={{ height: "20px", width: "80%", background: "rgba(255,255,255,0.04)", borderRadius: "2px", marginBottom: "1rem" }} />
        <div style={{ height: "14px", background: "rgba(255,255,255,0.03)", borderRadius: "2px", marginBottom: "0.4rem" }} />
        <div style={{ height: "14px", width: "70%", background: "rgba(255,255,255,0.03)", borderRadius: "2px" }} />
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }`}</style>
    </div>
  );
}

export default function FeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/data/articles?limit=3");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        console.log("Articles",json)
        if (json.success && Array.isArray(json.data)) {
          setArticles(json.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <section
      className="py-20"
      style={{
        backgroundColor: '#111111',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='152' height='152' viewBox='0 0 152 152'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='temple' fill='%23333333' fill-opacity='0.1'%3E%3Cpath d='M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z'/%3E%3C/g%3E%3C/G%3E%3C/svg%3E\")"
      }}
    >
      <div className="max-w-6xl mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
          data-aos="fade-up"
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#D4AF37",
              marginBottom: "0.75rem",
            }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Latest Reads
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Featured <span style={{ color: "#D4AF37" }}>Articles</span>
          </h2>
        </div>

        {/* Error state */}
        {error && (
          <p
            style={{
              textAlign: "center",
              color: "rgba(212,175,55,0.6)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
            }}
          >
            {error}
          </p>
        )}

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} index={i} />)
            : articles.map((article, i) => (
                <Card3D key={article.id} article={article} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}