'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '@/app/lib/api';

interface Article {
  title: string;
  date: string;
  slug: string;
  image: string;
  excerpt: string;
}

interface RecentArticlesSliderProps {
  articles: Article[];
  categoryTitle: string;
  categorySlug: string;
}

export default function RecentArticlesSlider({ articles, categoryTitle, categorySlug }: RecentArticlesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [articles.length]);

  if (articles.length === 0) return null;

  return (
    <div className="sticky top-24">
      <div className="rounded-3xl p-6 border border-gold/20"
        style={{
          background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)"
        }}
      >
        <div className="mb-6">
          <p className="font-sans tracking-[3px] text-gold text-sm mb-2">KEEP READING</p>
          <h3 className="font-serif text-xl font-bold text-white">
            More from {categoryTitle}
          </h3>
          <div className="w-16 h-px bg-gold mt-3"></div>
        </div>

        {/* 3D Slider Container */}
        <div className="relative perspective-1000" style={{ perspective: '1000px' }}>
          <div className="relative overflow-hidden" style={{ height: '320px' }}>
            {articles.map((article, index) => {
              const offset = (index - currentIndex + articles.length) % articles.length;
              const isActive = offset === 0;
              const isPrev = offset === articles.length - 1;
              const isNext = offset === 1;

              let transform = '';
              let opacity = 0;
              let zIndex = 0;

              if (isActive) {
                transform = 'translateX(0) translateZ(50px) scale(1)';
                opacity = 1;
                zIndex = 10;
              } else if (isPrev) {
                transform = 'translateX(-60%) translateZ(-50px) scale(0.85)';
                opacity = 0.4;
                zIndex = 5;
              } else if (isNext) {
                transform = 'translateX(60%) translateZ(-50px) scale(0.85)';
                opacity = 0.4;
                zIndex = 5;
              } else {
                transform = 'translateX(0) translateZ(-100px) scale(0.7)';
                opacity = 0;
                zIndex = 0;
              }

              return (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="absolute inset-0 transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-gold/30 relative"
                    style={{
                      background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)",
                      boxShadow: isActive ? '0 25px 70px rgba(212,175,55,0.15)' : 'none'
                    }}
                  >
                    <div className="aspect-video w-full overflow-hidden relative">
                      <Image
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        width={300}
                        height={169}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
                    </div>
                    <div className="p-4">
                      <p className="font-sans text-xs text-gold mb-1">{article.date}</p>
                      <h4 className="font-serif text-base font-semibold text-white hover:text-gold transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-gold w-6' : 'bg-gold/30'
                }`}
              />
            ))}
          </div>
        </div>

        <Link
          href={`/categories/${categorySlug}`}
          className="inline-flex items-center w-full justify-center px-6 py-3 bg-gold text-black font-semibold hover:bg-white transition-all duration-300 rounded-xl text-sm mt-6 group"
        >
          View All Articles
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
