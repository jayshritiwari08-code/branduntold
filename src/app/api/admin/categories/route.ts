import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const categories = await db.collection("categories").find({}).sort({ createdAt: -1 }).toArray();

    return Response.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return Response.json({ success: false, error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || (session as any)?.user?.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, slug, description, color } = body;

    if (!name || !slug) {
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("categories").insertOne({
      name,
      slug,
      description: description || "",
      color: color || "#C9A84C",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Response.json({ success: true, data: { _id: result.insertedId, ...body } });
  } catch (error) {
    console.error("Error creating category:", error);
    return Response.json({ success: false, error: "Failed to create category" }, { status: 500 });
  }
}
