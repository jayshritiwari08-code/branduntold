'use client';

import { useEffect, useState } from 'react';

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState<number>(0);

  useEffect(() => {
    // 1. Intersection Observer for active heading tracking
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const sorted = visibleEntries.sort(
            (a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top
          );
          setActiveId(sorted[0].target.id);
        }
      },
      {
        rootMargin: '-120px 0px -70% 0px',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    // 2. Scroll listener for reading progress calculation
    const handleScroll = () => {
      const articleEl = document.querySelector('article');
      if (!articleEl) return;

      const rect = articleEl.getBoundingClientRect();
      const articleHeight = rect.height;
      
      // Calculate viewport offset relative to article top
      const scrollPosition = window.scrollY + 120; // account for sticky header offset
      const articleTop = rect.top + window.scrollY;
      
      if (scrollPosition < articleTop) {
        setReadingProgress(0);
        return;
      }

      const scrolled = scrollPosition - articleTop;
      const totalScrollableHeight = articleHeight - window.innerHeight + 120;
      
      if (totalScrollableHeight <= 0) {
        setReadingProgress(100);
        return;
      }

      const progress = Math.max(0, Math.min(100, (scrolled / totalScrollableHeight) * 100));
      setReadingProgress(Math.round(progress));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run

    return () => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 120; // Sticky header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  if (!headings || headings.length === 0) return null;

  return (
    <div
      className="rounded-3xl p-6 bg-black relative overflow-hidden group/toc transition-all duration-500 hover:border-[#c2a15f]/40"
      style={{
        background: 'linear-gradient(160deg, #111111 0%, #070707 100%)',
        border: '1px solid rgba(194, 161, 95, 0.15)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.02)'
      }}
    >
      {/* Golden accent glow in background */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#c2a15f]/5 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 group-hover/toc:opacity-80" />

      <div className="relative animate-fade-in">
        <h3 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-[#c2a15f] text-sm animate-[spin_8s_linear_infinite] inline-block">✦</span>
          On This Page
        </h3>

        {/* Navigation list */}
        <div className="relative ml-1.5 pl-4 space-y-3.5 mb-6">
          {/* Vertical progress line background */}
          <div className="absolute left-0 top-1 bottom-1 w-px bg-gray-800/50" />
          {/* Dynamic filled line representation based on scroll progress */}
          <div 
            className="absolute left-0 top-1 w-px bg-gradient-to-b from-[#c2a15f] to-[#c2a15f]/30 transition-all duration-300"
            style={{ height: `${Math.min(100, Math.max(0, readingProgress - 5))}%` }}
          />

          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const isH3 = heading.level === 3;
            const isH4 = heading.level === 4;

            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleLinkClick(e, heading.id)}
                className={`block text-sm transition-all duration-300 relative py-0.5 hover:translate-x-1 group/link ${
                  isH3 
                    ? 'pl-4 text-gray-400 font-normal hover:text-white text-[13px]' 
                    : isH4 
                    ? 'pl-8 text-gray-500 font-light hover:text-white text-xs' 
                    : 'font-medium text-gray-300 hover:text-white'
                } ${
                  isActive 
                    ? '!text-[#c2a15f] font-semibold translate-x-1.5' 
                    : ''
                }`}
              >
                {/* Bullet point on the vertical timeline (glowing when active, subtle when inactive) */}
                <span 
                  className={`absolute -left-[19.5px] top-1/2 -translate-y-1/2 rounded-full transition-all duration-350 border-2 ${
                    isActive 
                      ? 'w-2 h-2 bg-[#c2a15f] border-black scale-110' 
                      : 'w-1.5 h-1.5 bg-[#141414] border-gray-800 group-hover/link:border-[#c2a15f]/60'
                  }`}
                  style={
                    isActive 
                      ? { boxShadow: '0 0 10px #c2a15f, 0 0 4px #c2a15f' } 
                      : undefined
                  }
                />
                {heading.text}
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800/40 my-4" />

        {/* Header and reading progress details */}
        <div className="flex items-center justify-between mb-2">
          <p className="font-sans text-[9px] tracking-[3px] text-[#c2a15f] uppercase font-bold">
            READING PROGRESS
          </p>
          <span className="font-mono text-xs text-[#c2a15f] font-semibold">
            {readingProgress}%
          </span>
        </div>

        {/* Dynamic horizontal reading progress bar */}
        <div className="w-full bg-gray-900/80 rounded-full h-1 overflow-hidden border border-gray-800/40">
          <div 
            className="bg-gradient-to-r from-[#c2a15f] to-[#e5c17d] h-full rounded-full transition-all duration-300 ease-out" 
            style={{ 
              width: `${readingProgress}%`, 
              boxShadow: '0 0 10px rgba(194, 161, 95, 0.4)' 
            }}
          />
        </div>
      </div>
    </div>
  );
}
