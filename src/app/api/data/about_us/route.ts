import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data - replace with actual CMS fetch
    const aboutData = [
      {
        id: "1",
        heading: "About Brand Untold",
        description1: "We believe every brand has a story worth telling.",
        description2: "Our mission is to help founders and businesses discover and share their authentic narratives.",
        short_description: "<h2><strong>The Story Behind Brand Untold</strong></h2><p>In 2024, we launched Brand Untold with a simple mission: to uncover the real stories behind the brands we interact with every day.</p><p>We're tired of polished, corporate speak. We want the real talk - the struggles, the breakthroughs, the late nights, and the moments of doubt that every founder experiences.</p><h2><strong>Why Storytelling Matters</strong></h2><p>Stories are how we connect. They're how we build trust, create loyalty, and inspire action. In a world of noise, authentic storytelling is your most powerful asset.</p><h2><strong>What We Do</strong></h2><p>We help brands find their voice, craft their narrative, and share their story with authenticity and impact.</p>",
        image: "/about1.jpg",
        created_at: "2026-05-28T00:00:00.000Z",
        updated_at: "2026-05-28T00:00:00.000Z"
      }
    ];

    return NextResponse.json({
      success: true,
      data: aboutData
    });
  } catch (error) {
    console.error("About API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}
