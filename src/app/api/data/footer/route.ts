import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data - replace with actual CMS fetch
    const footerData = [
      {
        id: "1",
        footerlogo: "/logo.png",
        description: "A platform dedicated to uncovering the real stories behind brands and founders — the thinking, the risks, the turning points, and the craft of storytelling.",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        created_at: "2026-05-28T00:00:00.000Z",
        updated_at: "2026-05-28T00:00:00.000Z"
      }
    ];

    return NextResponse.json({
      success: true,
      data: footerData
    });
  } catch (error) {
    console.error("Footer API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch footer data" },
      { status: 500 }
    );
  }
}
