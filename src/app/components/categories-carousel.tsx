"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const GOLD = "#C9A84C";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

interface Category {
  href: string;
  title: string;
  desc: string;
  img: string;
  tag: string;
  icon: string;
  altname?: string;
  img_title?: string;
}

export default function CategoriesCarousel({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const N = categories.length;
  const [active, setActive] = useState(() => Math.floor(N / 2));
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState<{
    width: number;
    cardWidth: number;
    cardHeight: number;
    imageHeight: number;
    txStep: number;
    perspective: number;
  }>({
    width: 1200,
    cardWidth: 390,
    cardHeight: 480,
    imageHeight: 220,
    txStep: 360,
    perspective: 1100,
  });

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Resize listener to adapt carousel layout to any screen width
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        const cardW = Math.max(260, Math.min(w - 48, 300));
        setScreenSize({
          width: w,
          cardWidth: cardW,
          cardHeight: 390,
          imageHeight: 165,
          txStep: Math.round(cardW * 0.72),
          perspective: 700,
        });
      } else if (w < 640) {
        const cardW = Math.min(w - 60, 330);
        setScreenSize({
          width: w,
          cardWidth: cardW,
          cardHeight: 410,
          imageHeight: 180,
          txStep: Math.round(cardW * 0.75),
          perspective: 800,
        });
      } else if (w < 1024) {
        setScreenSize({
          width: w,
          cardWidth: 340,
          cardHeight: 450,
          imageHeight: 200,
          txStep: 280,
          perspective: 950,
        });
      } else {
        setScreenSize({
          width: w,
          cardWidth: 390,
          cardHeight: 480,
          imageHeight: 220,
          txStep: 360,
          perspective: 1100,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (N === 0) return;
      setActive(mod(idx, N));
      setTilt({ x: 0, y: 0 });
    },
    [N]
  );

  const startAuto = useCallback(() => {
    if (N === 0) return;
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setActive((prev) => mod(prev + 1, N));
    }, 2800);
  }, [N]);

  const stopAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
  }, []);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  const handleMouseMove = (e: React.MouseEvent, idx: number) => {
    if (idx !== active || screenSize.width < 768) return;
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  // Touch swipe support for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    stopAuto();
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          goTo(active + 1);
        } else {
          goTo(active - 1);
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    startAuto();
  };

  const getStyle = (idx: number): React.CSSProperties => {
    if (N === 0) return {};
    const offset = mod(idx - active + Math.floor(N / 2), N) - Math.floor(N / 2);
    const isActive = offset === 0;
    const abs = Math.abs(offset);
    const scale = isActive ? 1 : Math.max(0.76, 0.86 - abs * 0.05);
    const tx = offset * screenSize.txStep;
    const tz = isActive ? (screenSize.width < 640 ? 30 : 60) : -80 - abs * 35;
    const rotY = isActive ? tilt.y : offset * (screenSize.width < 640 ? 12 : 18);
    const rotX = isActive ? tilt.x : 0;
    const opacity = abs > 1 ? (screenSize.width < 640 ? 0 : 0.2) : 1;

    return {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: `${screenSize.cardWidth}px`,
      transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) scale(${scale}) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
      zIndex: 10 - abs,
      opacity,
      transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s",
      cursor: "pointer",
      pointerEvents: abs > 1 && screenSize.width < 640 ? "none" : "auto",
    };
  };

  if (N === 0) return null;

  return (
    <div
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="w-full relative px-2 sm:px-4"
    >
      {/* Carousel Stage */}
      <div
        className="relative mx-auto w-full max-w-6xl"
        style={{
          height: `${screenSize.cardHeight + 40}px`,
          perspective: `${screenSize.perspective}px`,
          perspectiveOrigin: "center",
        }}
      >
        {categories.map((cat, idx) => {
          const isActive = idx === active;
          return (
            <div
              key={cat.title}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={getStyle(idx)}
              onClick={() => (idx !== active ? goTo(idx) : router.push(cat.href))}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-out flex flex-col"
                style={{
                  width: `${screenSize.cardWidth}px`,
                  height: `${screenSize.cardHeight}px`,
                  background: "#111",
                  border: `2px solid ${isActive ? GOLD : "#2a2a2a"}`,
                  boxShadow: isActive
                    ? "0 0 0 1px rgba(201,168,76,0.25), 0 20px 45px rgba(0,0,0,0.7)"
                    : "0 8px 24px rgba(0,0,0,0.45)",
                }}
              >
                {/* Image */}
                <div
                  className="relative w-full overflow-hidden flex-shrink-0"
                  style={{ height: `${screenSize.imageHeight}px` }}
                >
                  <Image
                    src={cat.img}
                    alt={cat.altname || cat.title}
                    title={cat.img_title || cat.altname || cat.title}
                    width={screenSize.cardWidth}
                    height={screenSize.imageHeight}
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 400px"
                    className="w-full h-full object-cover block transition-all duration-700 ease-in-out"
                    style={{
                      filter: isActive
                        ? "brightness(0.88)"
                        : "brightness(0.45) grayscale(0.4)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 40%, #111 100%)",
                    }}
                  />
                  {cat.tag && (
                    <span
                      className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded transition-all duration-300 shadow-md"
                      style={
                        isActive
                          ? { background: GOLD, color: "#111" }
                          : { background: "#222", color: "#666" }
                      }
                    >
                      {cat.tag}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                      <i
                        className={`ti ${cat.icon} text-base sm:text-lg flex-shrink-0 transition-colors duration-300`}
                        style={{ color: isActive ? GOLD : "#444" }}
                        aria-hidden="true"
                      />
                      <h3
                        className="m-0 text-base sm:text-lg md:text-xl font-bold truncate transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-playfair)",
                          color: isActive ? GOLD : "#555",
                        }}
                      >
                        {cat.title}
                      </h3>
                    </div>
                    <p
                      className="m-0 text-xs sm:text-sm leading-relaxed font-sans line-clamp-3 sm:line-clamp-4 transition-colors duration-300"
                      style={{ color: isActive ? "#bbb" : "#444" }}
                    >
                      {cat.desc}
                    </p>
                  </div>

                  {isActive && (
                    <div className="mt-2 sm:mt-4 pt-2.5 sm:pt-3 border-t border-gold/20 flex-shrink-0">
                      <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent mb-2 sm:mb-3" />
                      <Link
                        href={cat.href}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide no-underline transition-colors hover:text-white group"
                        style={{ color: GOLD, fontFamily: "sans-serif" }}
                      >
                        Explore{" "}
                        <i
                          className="ti ti-arrow-right text-sm sm:text-base group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to ${cat.title}`}
            className="h-[6px] sm:h-[7px] border-none p-0 rounded-full cursor-pointer transition-all duration-300"
            style={{
              width: idx === active ? 24 : 6,
              background: idx === active ? GOLD : "#333",
            }}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 mt-3">
        {[
          { label: "Previous", delta: -1, Icon: ChevronLeft },
          { label: "Next", delta: 1, Icon: ChevronRight },
        ].map(({ label, delta, Icon }) => (
          <button
            key={label}
            onClick={() => {
              goTo(active + delta);
              startAuto();
            }}
            aria-label={label}
            className="flex items-center justify-center bg-transparent rounded-lg p-2 sm:px-3 sm:py-1.5 transition-all duration-200 cursor-pointer active:scale-95"
            style={{ border: "1px solid #554010", color: GOLD }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = GOLD;
              (e.currentTarget as HTMLButtonElement).style.color = "#111";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = GOLD;
            }}
          >
            <Icon size={18} className="sm:w-5 sm:h-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
