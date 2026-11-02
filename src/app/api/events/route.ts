import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.weddingEvent.findMany({
      orderBy: { orderIndex: "asc" },
      include: {
        rsvpEvents: {
          where: { attending: true },
        },
      },
    });
    return NextResponse.json({ events });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      ceremonyDate,
      startTime,
      endTime,
      venueName,
      venueAddress,
      mapUrl,
      description,
      dressCode,
      dressCodeColors,
      imageUrl,
      orderIndex,
    } = body;

    const event = await prisma.weddingEvent.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        ceremonyDate: new Date(ceremonyDate),
        startTime,
        endTime,
        venueName,
        venueAddress,
        mapUrl,
        description,
        dressCode,
        dressCodeColors,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        orderIndex: Number(orderIndex) || 0,
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (err: any) {
    console.error("Create event error:", err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    if (data.ceremonyDate) {
      data.ceremonyDate = new Date(data.ceremonyDate);
    }

    const updated = await prisma.weddingEvent.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, event: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    await prisma.weddingEvent.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
