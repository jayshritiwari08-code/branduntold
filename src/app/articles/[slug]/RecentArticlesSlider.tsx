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
    }, 6000); // 6s interval for comfortable reading
    return () => clearInterval(interval);
  }, [articles.length]);

  if (articles.length === 0) return null;

  return (
    <div
      className="rounded-3xl p-6 bg-black relative overflow-hidden group/slider transition-all duration-500 hover:border-[#c2a15f]/40"
      style={{
        background: 'linear-gradient(160deg, #111111 0%, #070707 100%)',
        border: '1px solid rgba(194, 161, 95, 0.15)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.02)'
      }}
    >
      {/* Dynamic golden background glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#c2a15f]/5 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 group-hover/slider:opacity-80" />

      <div className="relative">
        <div className="mb-6">
          <p className="font-sans text-[10px] tracking-[3px] text-[#c2a15f] uppercase font-bold mb-2">
            KEEP READING
          </p>
          <h3 className="font-serif text-xl font-bold text-white leading-tight">
            More from {categoryTitle}
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#c2a15f] to-transparent mt-3"></div>
        </div>

        {/* 3D Slider Container */}
        <div className="relative" style={{ perspective: '1000px' }}>
          <div className="relative overflow-hidden" style={{ height: '310px' }}>
            {articles.map((article, index) => {
              const offset = (index - currentIndex + articles.length) % articles.length;
              const isActive = offset === 0;
              const isPrev = offset === articles.length - 1;
              const isNext = offset === 1;

              let transform = '';
              let opacity = 0;
              let zIndex = 0;
              let pointerEvents: 'auto' | 'none' = 'none';

              if (isActive) {
                transform = 'translateX(0) translateZ(40px) scale(1)';
                opacity = 1;
                zIndex = 10;
                pointerEvents = 'auto';
              } else if (isPrev) {
                transform = 'translateX(-50%) translateZ(-40px) scale(0.85)';
                opacity = 0.35;
                zIndex = 5;
              } else if (isNext) {
                transform = 'translateX(50%) translateZ(-40px) scale(0.85)';
                opacity = 0.35;
                zIndex = 5;
              } else {
                transform = 'translateX(0) translateZ(-80px) scale(0.7)';
                opacity = 0;
                zIndex = 0;
              }

              return (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="absolute inset-0 transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    pointerEvents,
                  }}
                >
                  <div 
                    className="w-full h-full rounded-2xl overflow-hidden border border-gray-800/80 bg-black/85 relative transition-all duration-300"
                    style={{
                      boxShadow: isActive ? '0 15px 35px rgba(194, 161, 95, 0.08)' : 'none'
                    }}
                  >
                    <div className="aspect-video w-full overflow-hidden relative">
                      <Image
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        width={300}
                        height={169}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 30vw, 350px"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
                    </div>
                    <div className="p-4">
                      <p className="font-sans text-[10px] text-[#c2a15f] font-semibold mb-1 uppercase tracking-wider">{article.date}</p>
                      <h4 className="font-serif text-base font-bold text-white hover:text-[#c2a15f] transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentIndex ? 'bg-[#c2a15f] w-5' : 'bg-gray-800 w-1.5'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex gap-2.5">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-gray-900/60 border border-gray-800 text-gray-400 hover:border-[#c2a15f] hover:text-[#c2a15f] transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-gray-900/60 border border-gray-800 text-gray-400 hover:border-[#c2a15f] hover:text-[#c2a15f] transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <Link
          href={`/categories/${categorySlug}`}
          className="inline-flex items-center w-full justify-center px-6 py-3 bg-[#c2a15f] text-black font-bold hover:bg-white hover:shadow-[0_4px_20px_rgba(194,161,95,0.25)] hover:scale-[1.01] transition-all duration-300 rounded-xl text-sm mt-6 group"
        >
          View All Articles
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
