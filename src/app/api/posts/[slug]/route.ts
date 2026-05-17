import clientPromise from "@/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const post = await db.collection("posts").findOne({
      slug: params.slug,
      published: true,
    });

    if (!post) {
      return Response.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return Response.json(
      { success: false, error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
