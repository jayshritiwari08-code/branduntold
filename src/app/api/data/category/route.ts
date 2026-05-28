import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data - replace with actual CMS fetch
    // Note: The 'id' field should match the 'category' field in articles API
    const categoriesData = [
      {
        id: "6a0f345f18153bfec723c178",
        tagline: "THE BUILDERS BEHIND THE BRANDS",
        heading: "Founder Stories",
        subheading: "Real stories of founders and brands that built something meaningful through vision, persistence, and authentic storytelling.",
        image: "/home1.jpeg",
        created_at: "2026-05-28T00:00:00.000Z",
        updated_at: "2026-05-28T00:00:00.000Z"
      },
      {
        id: "6a0f345f18153bfec723c179",
        tagline: "THE ANATOMY OF GREAT STORIES",
        heading: "Story Breakdowns",
        subheading: "Analytical articles explaining why certain stories work and how to craft compelling narratives for your brand.",
        image: "/home1.jpeg",
        created_at: "2026-05-28T00:00:00.000Z",
        updated_at: "2026-05-28T00:00:00.000Z"
      },
      {
        id: "6a0f345f18153bfec723c180",
        tagline: "CRAFT YOUR BRAND VOICE",
        heading: "Writing & Branding",
        subheading: "SEO articles with guides, tips, and frameworks for effective writing and brand building.",
        image: "/home1.jpeg",
        created_at: "2026-05-28T00:00:00.000Z",
        updated_at: "2026-05-28T00:00:00.000Z"
      }
    ];

    return NextResponse.json({
      success: true,
      data: categoriesData
    });
  } catch (error) {
    console.error("Categories API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories data" },
      { status: 500 }
    );
  }
}
