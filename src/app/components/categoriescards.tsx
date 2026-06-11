// Server component — no API call on the client.
// Data is passed in from the parent page (fetched server-side via ISR).
import CategoriesCarousel from "./categories-carousel";
import { getImageUrl } from "@/app/lib/api";

const GOLD = "#C9A84C";

interface RawCategory {
  id: string;
  heading: string;
  subheading?: string;
  image?: string;
  tagline?: string;
}

interface HeadingData {
  tagline?: string;
  heading?: string;
  subheading?: string;
}

interface Props {
  categories: RawCategory[];
  heading?: HeadingData | null;
}

function slugify(heading: string) {
  return heading.trim().toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
}

function iconForCategory(name: string) {
  const n = name.toLowerCase();
  if (n.includes("founder")) return "ti-user-circle";
  if (n.includes("breakdown")) return "ti-chart-dots";
  if (n.includes("writing")) return "ti-pencil";
  return "ti-article";
}

export default function CategoriesCards({ categories = [], heading }: Props) {
  const mapped = categories.map((item) => ({
    href: `/categories/${slugify(item.heading)}`,
    title: item.heading.trim(),
    desc: item.subheading ?? "",
    img: getImageUrl(item.image, "/blog-placeholder.jpg"),
    tag: item.tagline ?? "",
    icon: iconForCategory(item.heading),
  }));

  return (
    <section
      className="bg-[#0a0a0a] min-h-[700px] py-16 select-none overflow-hidden"
      style={{ fontFamily: "var(--font-playfair)" }}
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
        <p
          className="text-[#888] text-base leading-relaxed font-sans"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {heading?.subheading?.trim() ||
            "Every brand has a public story. Brand Untold goes deeper to explore the decisions and psychology behind them."}
        </p>
        <div
          className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-8"
          data-aos="fade-up"
          data-aos-delay="300"
        />
      </div>

      {/* Interactive carousel — client component */}
      {mapped.length > 0 ? (
        <CategoriesCarousel categories={mapped} />
      ) : (
        <p className="text-center text-[#555] font-sans">No categories yet.</p>
      )}
    </section>
  );
}
