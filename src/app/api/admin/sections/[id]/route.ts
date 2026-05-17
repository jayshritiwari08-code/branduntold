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
    const section = await db
      .collection("sections")
      .findOne({ _id: new ObjectId(params.id) });

    if (!section) {
      return Response.json(
        { success: false, error: "Section not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: section });
  } catch (error) {
    console.error("Error fetching section:", error);
    return Response.json(
      { success: false, error: "Failed to fetch section" },
      { status: 500 }
    );
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
    const { heading, subHeading, section_name, cards } = body;

    if (!heading || !section_name) {
      return Response.json(
        { success: false, error: "heading and section_name are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("sections").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          heading,
          subHeading: subHeading || "",
          section_name,
          cards: cards || [],
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return Response.json(
        { success: false, error: "Section not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: { _id: params.id, ...body },
    });
  } catch (error) {
    console.error("Error updating section:", error);
    return Response.json(
      { success: false, error: "Failed to update section" },
      { status: 500 }
    );
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

    const result = await db
      .collection("sections")
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return Response.json(
        { success: false, error: "Section not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, message: "Section deleted" });
  } catch (error) {
    console.error("Error deleting section:", error);
    return Response.json(
      { success: false, error: "Failed to delete section" },
      { status: 500 }
    );
  }
}
