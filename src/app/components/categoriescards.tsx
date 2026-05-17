import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    href: "/categories/founder-stories",
    title: "Founder Stories",
    desc: "Real stories of founders and brands that built something meaningful.",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
    tag: "Stories",
    icon: "ti-user-circle",
  },
  {
    href: "/categories/story-breakdowns",
    title: "Story Breakdowns",
    desc: "Analytical articles explaining why certain stories work and how to craft them.",
    img: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=600&q=80",
    tag: "Analysis",
    icon: "ti-chart-dots",
  },
  {
    href: "/categories/writing-branding",
    title: "Writing & Branding",
    desc: "SEO articles with guides, tips, and frameworks for effective writing.",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
    tag: "Guides",
    icon: "ti-pencil",
  },
];

const N = categories.length;
const GOLD = "#C9A84C";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function CategoriesCards() {
  const [active, setActive] = useState(1);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setActive(mod(idx, N));
    setTilt({ x: 0, y: 0 });
  }, []);

  const startAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setActive((prev) => mod(prev + 1, N));
    }, 2200);
  }, []);

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
    const offset = mod(idx - active + Math.floor(N / 2), N) - Math.floor(N / 2);
    const isActive = offset === 0;
    const abs = Math.abs(offset);
    const scale = isActive ? 1 : 0.86 - abs * 0.04;
    const tx = offset * 310;
    const tz = isActive ? 40 : -70 - abs * 30;
    const rotY = isActive ? tilt.y : offset * 20;
    const rotX = isActive ? tilt.x : 0;
    const opacity = abs > 1 ? 0.25 : 1;

    return {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 340,
      transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) scale(${scale}) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
      zIndex: 10 - abs,
      opacity,
      transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s",
      cursor: isActive ? "default" : "pointer",
    };
  };

  const prevIdx = mod(active - 1, N);
  const nextIdx = mod(active + 1, N);

  return (
    <section
      className="bg-[#0a0a0a] min-h-[600px] py-16 select-none overflow-hidden"
     
      style={{ fontFamily: "var(--font-playfair)" }}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      {/* Header */}
      <div className="max-w-2xl mx-auto px-4 mb-12 text-center">
        <h2
          className="text-4xl md:text-5xl font-bold mb-3"
          style={{ color: GOLD, fontFamily: "var(--font-playfair)" }}
        >
          What We Do
        </h2>
        <h3
          className="text-white text-2xl md:text-3xl font-semibold mb-5"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          The Stories Brands Don't Tell
        </h3>
        <p className="text-[#888] text-base leading-relaxed font-sans">
          Every brand has a public story — the funding round, the viral moment, the perfect origin
          myth. Brand Untold goes deeper. We explore the decisions made under pressure, the pivots
          nobody announced, and the human psychology behind why certain brands connect and others
          don't.
        </p>
      </div>

      {/* Carousel Stage */}
      <div
        className="relative h-[420px] w-full max-w-[1400px] mx-auto"
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
              onClick={() => idx !== active && goTo(idx)}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="rounded-2xl overflow-hidden transition-all duration-700 ease-out"
                style={{
                  width: 340,
                  height: 400,
                  background: "#111",
                  border: `2px solid ${isActive ? GOLD : "#2a2a2a"}`,
                  boxShadow: isActive
                    ? `0 0 0 1px rgba(201,168,76,0.2), 0 28px 56px rgba(0,0,0,0.6)`
                    : "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                {/* Image */}
                <div className="relative h-[190px] overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.title}
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
                      className="m-0 text-[17px] font-bold transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-playfair)",
                        color: isActive ? GOLD : "#555",
                      }}
                    >
                      {cat.title}
                    </h3>
                  </div>
                  <p
                    className="m-0 text-sm leading-relaxed font-sans transition-colors duration-300"
                    style={{ color: isActive ? "#bbb" : "#3a3a3a" }}
                  >
                    {cat.desc}
                  </p>
                  {isActive && (
                    <a
                      href={cat.href}
                      className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold tracking-wide no-underline transition-colors hover:text-white"
                      style={{ color: GOLD, fontFamily: "sans-serif" }}
                    >
                      Explore{" "}
                      <i className="ti ti-arrow-right text-base" aria-hidden="true" />
                    </a>
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