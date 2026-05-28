import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data - replace with actual CMS fetch
    const heroData = [
      {
        id: "1",
        tagline: "Beyond the Brand",
        heading: "The Story Behind Every Brand",
        description: "<p>Exploring the narratives that shape brands, founders, and the art of storytelling itself. We uncover the real people, real struggles, and real triumphs behind the companies we admire.</p>",
        image: "/home1.jpeg",
        created_at: "2026-05-28T00:00:00.000Z",
        updated_at: "2026-05-28T00:00:00.000Z"
      }
    ];

    return NextResponse.json({
      success: true,
      data: heroData
    });
  } catch (error) {
    console.error("Hero API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch hero data" },
      { status: 500 }
    );
  }
}
