// Server component — no API call on the client.
// Data is passed in from the parent page (fetched server-side via ISR).
import CategoriesCarousel from "./categories-carousel";
import { getImageUrl, slugify } from "@/app/lib/api";

const GOLD = "#C9A84C";

interface RawCategory {
  id: string;
  heading: string;
  subheading?: string;
  image?: string;
  tagline?: string;
  altname?: string;
  img_title?: string;
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
    altname: item.altname,
    img_title: item.img_title,
  }));

  return (
    <section
      className="bg-[#0a0a0a] min-h-[500px] sm:min-h-[600px] md:min-h-[700px] py-10 sm:py-16 md:py-20 px-3 sm:px-6 select-none overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8 sm:mb-12 text-center px-2">
        <h2
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 leading-tight"
          style={{ color: GOLD }}
          data-aos="fade-up"
        >
          {heading?.tagline?.trim() || "What We Do"}
        </h2>
        <h3
          className="text-white text-lg sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-5 leading-snug"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {heading?.heading?.trim() || "The Stories Brands Don't Tell"}
        </h3>
        <p
          className="text-[#888] text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {heading?.subheading?.trim() ||
            "Every brand has a public story. Brand Untold goes deeper to explore the decisions and psychology behind them."}
        </p>
        <div
          className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-6 sm:mt-8"
          data-aos="fade-up"
          data-aos-delay="300"
        />
      </div>

      {/* Interactive carousel — client component */}
      {mapped.length > 0 ? (
        <CategoriesCarousel categories={mapped} />
      ) : (
        <p className="text-center text-[#555] font-sans text-sm sm:text-base">No categories yet.</p>
      )}
    </section>
  );
}
