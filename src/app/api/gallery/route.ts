import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const mediaType = searchParams.get("type");

    const where: any = {};
    if (category && category !== "all") {
      where.category = category;
    }
    if (mediaType && mediaType !== "all") {
      where.mediaType = mediaType;
    }

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { orderIndex: "asc" }],
    });

    return NextResponse.json({ images });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, imageUrl, videoUrl, mediaType, caption, isFeatured, orderIndex } = body;

    if (!title || (!imageUrl && !videoUrl)) {
      return NextResponse.json(
        { error: "Title and at least one media URL (image or video) are required." },
        { status: 400 }
      );
    }

    const image = await prisma.galleryImage.create({
      data: {
        title,
        category: category || "couple",
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
        videoUrl: videoUrl || null,
        mediaType: mediaType || (videoUrl ? "video" : "image"),
        caption: caption || null,
        isFeatured: Boolean(isFeatured),
        orderIndex: Number(orderIndex) || 0,
      },
    });

    return NextResponse.json({ success: true, image });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to add media item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    await prisma.galleryImage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
