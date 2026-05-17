import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || (session as any)?.user?.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();
    const post = await db.collection("posts").findOne({ _id: new ObjectId(params.id) });

    if (!post) {
      return Response.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return Response.json({ success: true, data: post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return Response.json({ success: false, error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || (session as any)?.user?.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, slug, excerpt, content, categoryId, image, published } = body;

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("posts").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          title,
          slug,
          excerpt: excerpt || "",
          content,
          categoryId: categoryId ? new ObjectId(categoryId) : null,
          image: image || "",
          published: published || false,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return Response.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return Response.json({ success: true, data: { _id: params.id, ...body } });
  } catch (error) {
    console.error("Error updating post:", error);
    return Response.json({ success: false, error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || (session as any)?.user?.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("posts").deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return Response.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return Response.json({ success: false, error: "Failed to delete post" }, { status: 500 });
  }
}
