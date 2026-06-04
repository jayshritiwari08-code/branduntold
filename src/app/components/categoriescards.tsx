"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHeadingBySection } from "../hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const GOLD = "#C9A84C";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function CategoriesCards() {
  const router = useRouter();
  const { data: headerData, loading: headerLoading } = useHeadingBySection('category');
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const N = categories.length;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/data/category');
        const json = await res.json();
        console.log("Fetched categories:", json);
        if (json.success && json.data) {
          const mapped = json.data.map((item: any) => ({
            href: `/categories/${item.heading.trim().toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`,
            title: item.heading.trim(),
            desc: item.subheading,
            img: item.image,
            tag: item.tagline,
            icon: item.heading.toLowerCase().includes("founder") ? "ti-user-circle" : 
                  item.heading.toLowerCase().includes("breakdown") ? "ti-chart-dots" : 
                  item.heading.toLowerCase().includes("writing") ? "ti-pencil" : "ti-article",
          }));
          setCategories(mapped);
          if (mapped.length > 0) {
            setActive(Math.floor(mapped.length / 2));
          }
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const goTo = useCallback((idx: number) => {
    if (N === 0) return;
    setActive(mod(idx, N));
    setTilt({ x: 0, y: 0 });
  }, [N]);

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
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
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

  if (loading || headerLoading) {
    return (
      <div className="bg-[#0a0a0a] min-h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gold font-serif text-xl">Loading Stories...</p>
        </div>
      </div>
    );
  }

  if (N === 0) return null;

  const heading = Array.isArray(headerData) ? headerData[0] : headerData;

  return (
    <section
      className="bg-[#0a0a0a] min-h-[700px] py-16 select-none overflow-hidden"
     
      style={{ fontFamily: "var(--font-playfair)" }}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      {/* Header */}
      <div className="max-w-2xl mx-auto px-2.5 sm:px-4 mb-12 text-center">
        <h2
          className="text-4xl md:text-5xl font-bold mb-3"
          style={{ color: GOLD, fontFamily: "var(--font-playfair)" }}
          data-aos="fade-up"
        >
          {heading?.tagline?.trim() || "What We Do"}
        </h2>
        <h3
          className="text-white text-2xl md:text-3xl font-semibold mb-5"
          style={{ fontFamily: "var(--font-playfair)" }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {heading?.heading?.trim() || "The Stories Brands Don't Tell"}
        </h3>
        <p className="text-[#888] text-base leading-relaxed font-sans" data-aos="fade-up" data-aos-delay="200">
          {heading?.subheading?.trim() || "Every brand has a public story. Brand Untold goes deeper to explore the decisions and psychology behind them."}
        </p>
        
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-8" 
             data-aos="fade-up" data-aos-delay="300" />
      </div>

      {/* Carousel Stage */}
      <div
        className="relative h-[520px] w-full max-w-[1600px] mx-auto"
        style={{ perspective: "1100px", perspectiveOrigin: "center" }}
      >
       

        {/* Cards */}
        {categories.map((cat, idx) => {
          const isActive = idx === active;
          return (
            <div
              key={cat.title}
              ref={(el) => { cardRefs.current[idx] = el; }}
              style={getStyle(idx)}
              onClick={() => {
                if (idx !== active) {
                  goTo(idx);
                } else {
                  router.push(cat.href);
                }
              }}
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
                    ? `0 0 0 1px rgba(201,168,76,0.2), 0 28px 56px rgba(0,0,0,0.6)`
                    : "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                {/* Image */}
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    width={400}
                    height={420}
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
                      background: "linear-gradient(to bottom, transparent 50%, #111 100%)",
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
                  
                  {/* Separator and Link */}
                  {isActive && (
                    <div className="mt-4 pt-5 border-t border-gold/20" data-aos="fade-up" data-aos-delay="100">
                      <div className="w-16 h-px bg-gradient-to-r from-gold via-gold/50 to-transparent mb-4" />
                      <Link
                        href={cat.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide no-underline transition-colors hover:text-white group"
                        style={{ color: GOLD, fontFamily: "sans-serif" }}
                      >
                        Explore{" "}
                        <i className="ti ti-arrow-right text-base group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
        {categories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to ${categories[idx].title}`}
            className="h-[7px] border-none p-0 rounded cursor-pointer transition-all duration-300"
            style={{
              width: idx === active ? 28 : 7,
              background: idx === active ? GOLD : "#333",
            }}
          />
        ))}
      </div>

      {/* Arrows — always enabled, wrap around */}
      <div className="flex justify-center gap-3 mt-3">
        <button
          onClick={() => { goTo(active - 1); startAuto(); }}
          aria-label="Previous"
          className="flex items-center bg-transparent rounded-lg px-3 py-1.5 transition-all duration-200"
          style={{ border: `1px solid #554010`, color: GOLD }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = GOLD;
            (e.currentTarget as HTMLButtonElement).style.color = "#111";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = GOLD;
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => { goTo(active + 1); startAuto(); }}
          aria-label="Next"
          className="flex items-center bg-transparent rounded-lg px-3 py-1.5 transition-all duration-200"
          style={{ border: `1px solid #554010`, color: GOLD }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = GOLD;
            (e.currentTarget as HTMLButtonElement).style.color = "#111";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = GOLD;
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}