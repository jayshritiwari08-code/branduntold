import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const categories = [
  {
    href: "/categories/founder-stories",
    title: "Founder Stories",
    desc: "Real stories of founders and brands that built something meaningful.",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
    tag: "Stories",
    icon: "ti-user-circle",
    accent: "#B8960C",
  },
  {
    href: "/categories/story-breakdowns",
    title: "Story Breakdowns",
    desc: "Analytical articles explaining why certain stories work and how to craft them.",
    img: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=600&q=80",
    tag: "Analysis",
    icon: "ti-chart-dots",
    accent: "#B8960C",
  },
  {
    href: "/categories/writing-branding",
    title: "Writing & Branding",
    desc: "SEO articles with guides, tips, and frameworks for effective writing.",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
    tag: "Guides",
    icon: "ti-pencil",
    accent: "#B8960C",
  },
];

const GOLD = "#C9A84C";
const GOLD_DIM = "#8B6914";

export default function CategoriesCards() {
  const [active, setActive] = useState(1);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent, idx: number) => {
    if (idx !== active) return;
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const getStyle = (idx: number) => {
    const offset = idx - active;
    const isActive = offset === 0;
    const abs = Math.abs(offset);
    const zIndex = 10 - abs;
    const scale = isActive ? 1 : 0.88 - abs * 0.04;
    const tx = offset * 340;
    const tz = isActive ? 40 : -60 - abs * 30;
    const rotY = isActive ? tilt.y : offset * 18;
    const rotX = isActive ? tilt.x : 0;
    const opacity = abs > 1 ? 0.35 : 1;

    return {
      position: "absolute" as const,
      left: "50%",
      top: "50%",
      width: 380,
      transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) scale(${scale}) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
      zIndex,
      opacity,
      transition: isActive
        ? "transform 0.08s ease-out, opacity 0.3s"
        : "transform 0.4s cubic-bezier(.22,.68,0,.99), opacity 0.3s",
      cursor: isActive ? "default" : "pointer",
    };
  };

  return (
    <section className="bg-[#0a0a0a] min-h-[600px] py-20 font-georgia select-none overflow-hidden">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center" data-aos="fade-up">
        <h2 
          className="text-gold text-4xl md:text-5xl font-bold mb-4 font-serif"
          style={{ fontFamily: "'Playfair Display', serif" }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          What We Do
        </h2>
        <h3 
          className="text-white text-2xl md:text-3xl font-semibold mb-6 font-serif"
          style={{ fontFamily: "'Playfair Display', serif" }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          The Stories Brands Don't Tell
        </h3>
        <p 
          className="text-grey text-lg leading-relaxed max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Every brand has a public story — the funding round, the viral moment, the perfect origin myth. Brand Untold goes deeper. We explore the decisions made under pressure, the pivots nobody announced, and the human psychology behind why certain brands connect and others don't.
        </p>
      </div>

      {/* Carousel Container */}
      <div 
        className="perspective-[1100px] perspective-center h-[450px] relative w-full max-w-[1400px] mx-auto"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {categories.map((cat, idx) => (
          <div
            key={cat.title}
            ref={el => { cardRefs.current[idx] = el; }}
            style={getStyle(idx)}
            onClick={() => idx !== active && setActive(idx)}
            onMouseMove={(e) => handleMouseMove(e, idx)}
            onMouseLeave={handleMouseLeave}
            data-aos={idx === active ? "zoom-in" : "fade-up"}
            data-aos-delay={idx * 150}
            data-aos-duration="800"
          >
            <div className={`w-[400px] h-[420px] rounded-2xl overflow-hidden border-2 bg-[#111] transition-all duration-300 ${
              idx === active 
                ? `border-[#C9A84C] shadow-[0_0_0_1px_#C9A84C_44,0_32px_64px_#00000099]` 
                : 'border-[#2a2a2a] shadow-[0_8px_32px_#00000066]'
            }`}>
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className={`w-full h-full object-cover block transition-all duration-400 ${
                    idx === active ? 'brightness-[0.85]' : 'brightness-[0.5] grayscale-[0.4]'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#111]" />
                <span className={`absolute top-3 right-3 text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded transition-all duration-300 ${
                  idx === active 
                    ? `bg-[${GOLD}] text-[#111]` 
                    : 'bg-[#222] text-[#888]'
                }`}>
                  {cat.tag}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <i className={`ti ${cat.icon} text-lg transition-colors duration-300 ${
                    idx === active ? `text-[${GOLD}]` : 'text-[#555]'
                  }`} aria-hidden="true"/>
                  <h3 className={`m-0 text-lg font-bold font-serif transition-colors duration-300 ${
                    idx === active ? `text-[${GOLD}]` : 'text-[#666]'
                  }`}>
                    {cat.title}
                  </h3>
                </div>
                <p className={`m-0 text-sm leading-relaxed font-sans transition-colors duration-300 ${
                  idx === active ? 'text-[#bbb]' : 'text-[#444]'
                }`}>
                  {cat.desc}
                </p>
                {idx === active && (
                  <a
                    href={cat.href}
                    className="inline-flex items-center gap-1.5 mt-4 text-gold text-sm font-semibold tracking-wide no-underline hover:text-white transition-colors"
                  >
                    Explore <i className="ti ti-arrow-right text-base" aria-hidden="true"/>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div 
        className="flex justify-center gap-2.5 mt-6"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        {categories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            aria-label={`Go to ${categories[idx].title}`}
            className={`h-2 rounded-none border-none p-0 cursor-pointer transition-all duration-300 ${
              idx === active 
                ? `w-7 bg-[#C9A84C]` 
                : 'w-2 bg-[#333]'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div 
        className="flex justify-center gap-4 mt-4"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <button
          onClick={() => setActive(a => Math.max(0, a - 1))}
          disabled={active === 0}
          className={`bg-transparent border rounded-md px-3.5 py-1.5 text-lg transition-all duration-200 ${
            active === 0 
              ? 'border-[#2a2a2a] text-[#333] cursor-default' 
              : `border-[${GOLD_DIM}] text-[${GOLD}] cursor-pointer hover:bg-[${GOLD}] hover:text-[#111]`
          }`}
          aria-label="Previous"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => setActive(a => Math.min(categories.length - 1, a + 1))}
          disabled={active === categories.length - 1}
          className={`bg-transparent border rounded-md px-3.5 py-1.5 text-lg transition-all duration-200 ${
            active === categories.length - 1 
              ? 'border-[#2a2a2a] text-[#333] cursor-default' 
              : `border-[${GOLD_DIM}] text-[${GOLD}] cursor-pointer hover:bg-[${GOLD}] hover:text-[#111]`
          }`}
          aria-label="Next"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}