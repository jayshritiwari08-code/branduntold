import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Get category
    const category = await db.collection("categories").findOne({
      slug: params.slug,
    });

    if (!category) {
      return Response.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    // Get posts in this category
    const posts = await db
      .collection("posts")
      .find({
        categoryId: new ObjectId(category._id),
        published: true,
      })
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,
      data: { category, posts },
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return Response.json(
      { success: false, error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
