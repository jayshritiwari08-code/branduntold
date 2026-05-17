import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Get a single banner
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const banner = await db
      .collection("banners")
      .findOne({ _id: new ObjectId(params.id) });

    if (!banner) {
      return Response.json(
        { success: false, error: "Banner not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: banner });
  } catch (error) {
    return Response.json(
      { success: false, error: "Invalid ID or server error" },
      { status: 500 }
    );
  }
}

// Update a banner
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { heading, subHeading, tagline, slug } = body;

    const client = await clientPromise;
    const db = client.db();

    const updateData: any = {
      updatedAt: new Date(),
    };
    if (heading) updateData.heading = heading;
    if (subHeading) updateData.subHeading = subHeading;
    if (tagline) updateData.tagline = tagline;
    if (slug) updateData.slug = slug;

    const result = await db.collection("banners").findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: updateData },
      { returnDocument: "after" }
    );

    if (!result) {
      return Response.json(
        { success: false, error: "Banner not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json(
      { success: false, error: "Failed to update banner" },
      { status: 500 }
    );
  }
}

// Delete a banner
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db
      .collection("banners")
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return Response.json(
        { success: false, error: "Banner not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, message: "Banner deleted" });
  } catch (error) {
    return Response.json(
      { success: false, error: "Failed to delete banner" },
      { status: 500 }
    );
  }
}