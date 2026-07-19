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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

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
    }, 2200);
  }, [N]);

  const stopAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
  }, []);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  const handleMouseMove = (e: React.MouseEvent, idx: number) => {
    if (idx !== active) return;
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const getStyle = (idx: number): React.CSSProperties => {
    if (N === 0) return {};
    const offset = mod(idx - active + Math.floor(N / 2), N) - Math.floor(N / 2);
    const isActive = offset === 0;
    const abs = Math.abs(offset);
    const scale = isActive ? 1 : 0.86 - abs * 0.04;
    const tx = offset * 360;
    const tz = isActive ? 60 : -90 - abs * 40;
    const rotY = isActive ? tilt.y : offset * 20;
    const rotX = isActive ? tilt.x : 0;
    const opacity = abs > 1 ? 0.25 : 1;

    return {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 400,
      transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) scale(${scale}) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
      zIndex: 10 - abs,
      opacity,
      transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s",
      cursor: "pointer",
    };
  };

  if (N === 0) return null;

  return (
    <div onMouseEnter={stopAuto} onMouseLeave={startAuto}>
      {/* Carousel Stage */}
      <div
        className="relative h-[520px] w-full max-w-6xl mx-auto"
        style={{ perspective: "1100px", perspectiveOrigin: "center" }}
      >
        {categories.map((cat, idx) => {
          const isActive = idx === active;
          return (
            <div
              key={cat.title}
              ref={(el) => { cardRefs.current[idx] = el; }}
              style={getStyle(idx)}
              onClick={() => (idx !== active ? goTo(idx) : router.push(cat.href))}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="rounded-2xl overflow-hidden transition-all duration-700 ease-out"
                style={{
                  width: 400,
                  height: 480,
                  background: "#111",
                  border: `2px solid ${isActive ? GOLD : "#2a2a2a"}`,
                  boxShadow: isActive
                    ? "0 0 0 1px rgba(201,168,76,0.2), 0 28px 56px rgba(0,0,0,0.6)"
                    : "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                {/* Image */}
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={cat.img}
                    alt={cat.altname || cat.title}
                    title={cat.img_title || cat.altname || cat.title}
                    width={400}
                    height={220}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="w-full h-full object-cover block transition-all duration-700 ease-in-out"
                    style={{
                      filter: isActive
                        ? "brightness(0.85)"
                        : "brightness(0.45) grayscale(0.4)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 50%, #111 100%)",
                    }}
                  />
                  <span
                    className="absolute top-2.5 right-2.5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded transition-all duration-300"
                    style={
                      isActive
                        ? { background: GOLD, color: "#111" }
                        : { background: "#222", color: "#555" }
                    }
                  >
                    {cat.tag}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <i
                      className={`ti ${cat.icon} text-lg transition-colors duration-300`}
                      style={{ color: isActive ? GOLD : "#444" }}
                      aria-hidden="true"
                    />
                    <h3
                      className="m-0 text-xl font-bold transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-playfair)",
                        color: isActive ? GOLD : "#555",
                      }}
                    >
                      {cat.title}
                    </h3>
                  </div>
                  <p
                    className="m-0 text-md leading-relaxed font-sans transition-colors duration-300"
                    style={{ color: isActive ? "#bbb" : "#3a3a3a" }}
                  >
                    {cat.desc}
                  </p>

                  {isActive && (
                    <div className="mt-4 pt-5 border-t border-gold/20">
                      <div className="w-16 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent mb-4" />
                      <Link
                        href={cat.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide no-underline transition-colors hover:text-white group"
                        style={{ color: GOLD, fontFamily: "sans-serif" }}
                      >
                        Explore{" "}
                        <i
                          className="ti ti-arrow-right text-base group-hover:translate-x-1 transition-transform"
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
      <div className="flex justify-center gap-2 mt-5">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to ${cat.title}`}
            className="h-[7px] border-none p-0 rounded cursor-pointer transition-all duration-300"
            style={{
              width: idx === active ? 28 : 7,
              background: idx === active ? GOLD : "#333",
            }}
          />
        ))}
      </div>

      {/* Arrows */}
      <div className="flex justify-center gap-3 mt-3">
        {[
          { label: "Previous", delta: -1, Icon: ChevronLeft },
          { label: "Next", delta: 1, Icon: ChevronRight },
        ].map(({ label, delta, Icon }) => (
          <button
            key={label}
            onClick={() => { goTo(active + delta); startAuto(); }}
            aria-label={label}
            className="flex items-center bg-transparent rounded-lg px-3 py-1.5 transition-all duration-200"
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
            <Icon size={20} />
          </button>
        ))}
      </div>
    </div>
  );
}
