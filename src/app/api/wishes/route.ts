import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    const wishes = await prisma.guestWish.findMany({
      where: all ? {} : { isApproved: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ wishes });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch wishes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { guestName, message, relation } = body;

    if (!guestName || !message) {
      return NextResponse.json(
        { error: "Guest name and message are required" },
        { status: 400 }
      );
    }

    const newWish = await prisma.guestWish.create({
      data: {
        guestName,
        message,
        relation: relation || "Well-wisher",
        isApproved: true,
      },
    });

    return NextResponse.json({ success: true, wish: newWish });
  } catch (err: any) {
    console.error("Wishes POST error:", err);
    return NextResponse.json({ error: "Failed to post wish" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, isApproved } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Wish ID is required" }, { status: 400 });
    }

    const updated = await prisma.guestWish.update({
      where: { id },
      data: { isApproved: Boolean(isApproved) },
    });

    return NextResponse.json({ success: true, wish: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update wish" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Wish ID is required" }, { status: 400 });
    }

    await prisma.guestWish.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete wish" }, { status: 500 });
  }
}
