import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || (session as any)?.user?.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();
    const posts = await db.collection("posts").find({}).sort({ createdAt: -1 }).toArray();

    return Response.json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return Response.json({ success: false, error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || (session as any)?.user?.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, slug, excerpt, content, categoryId, image, published } = body;

    if (!title || !slug || !content) {
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("posts").insertOne({
      title,
      slug,
      excerpt: excerpt || "",
      content,
      categoryId: categoryId ? new ObjectId(categoryId) : null,
      image: image || "",
      published: published || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: new ObjectId((session as any)?.user?.id),
    });

    return Response.json({ success: true, data: { _id: result.insertedId, ...body } });
  } catch (error) {
    console.error("Error creating post:", error);
    return Response.json({ success: false, error: "Failed to create post" }, { status: 500 });
  }
}
