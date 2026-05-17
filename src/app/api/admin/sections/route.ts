import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || (session as any)?.user?.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();
    const sections = await db
      .collection("sections")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({ success: true, data: sections });
  } catch (error) {
    console.error("Error fetching sections:", error);
    return Response.json(
      { success: false, error: "Failed to fetch sections" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
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

    const result = await db.collection("sections").insertOne({
      heading,
      subHeading: subHeading || "",
      section_name,
      cards: cards || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Response.json({
      success: true,
      data: { _id: result.insertedId, ...body },
    });
  } catch (error) {
    console.error("Error creating section:", error);
    return Response.json(
      { success: false, error: "Failed to create section" },
      { status: 500 }
    );
  }
}
