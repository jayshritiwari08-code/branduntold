import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const category = await db.collection("categories").findOne({ _id: new ObjectId(params.id) });

    if (!category) {
      return Response.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    return Response.json({ success: true, data: category });
  } catch (error) {
    console.error("Error fetching category:", error);
    return Response.json({ success: false, error: "Failed to fetch category" }, { status: 500 });
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
    const { name, slug, description, color } = body;

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("categories").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          name,
          slug,
          description: description || "",
          color: color || "#C9A84C",
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return Response.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    return Response.json({ success: true, data: { _id: params.id, ...body } });
  } catch (error) {
    console.error("Error updating category:", error);
    return Response.json({ success: false, error: "Failed to update category" }, { status: 500 });
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

    const result = await db.collection("categories").deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return Response.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return Response.json({ success: false, error: "Failed to delete category" }, { status: 500 });
  }
}
