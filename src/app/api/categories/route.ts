import clientPromise from "@/lib/mongodb";

// Get all categories
export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const categories = await db
      .collection("categories")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return Response.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
