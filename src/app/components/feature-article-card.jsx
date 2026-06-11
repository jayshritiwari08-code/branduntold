"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { getImageUrl } from "@/app/lib/api";

export default function FeatureArticleCard({ article, index }) {
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
  const imageUrl = getImageUrl(article.image, "/blog-placeholder.jpg");
  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
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
      {/* Glow overlay */}
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
          boxShadow:
            "0 25px 70px rgba(0,0,0,0.7), 0 4px 24px rgba(212,175,55,0.04), inset 0 1px 0 rgba(255,255,255,0.03)",
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
          {/* ref lives on this wrapper; the transform is applied here for the parallax effect */}
          <div
            ref={imgRef}
            style={{
              position: "absolute",
              inset: 0,
              transition: "transform 0.15s ease-out",
            }}
          >
            <Image
              src={imageUrl}
              alt={article.title || "Article image"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              style={{ display: "block" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
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
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.gap = "10px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#D4AF37";
                e.currentTarget.style.gap = "6px";
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
