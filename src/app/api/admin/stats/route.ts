import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalGuests = await prisma.guest.count();
    const invitations = await prisma.invitation.findMany();
    const rsvps = await prisma.rsvp.findMany({
      include: {
        guest: true,
        eventsAttending: {
          include: {
            weddingEvent: true,
          },
        },
      },
    });

    const confirmedRsvps = rsvps.filter((r) => r.attending);
    const declinedRsvps = rsvps.filter((r) => !r.attending);

    const totalConfirmedAttendees = confirmedRsvps.reduce(
      (acc, curr) => acc + (curr.totalAttending || 1),
      0
    );

    const pendingCount = invitations.filter(
      (inv) => inv.status === "PENDING" || inv.status === "SENT" || inv.status === "OPENED"
    ).length;

    // Event-wise attendance
    const events = await prisma.weddingEvent.findMany({
      include: {
        rsvpEvents: {
          where: { attending: true },
        },
      },
      orderBy: { orderIndex: "asc" },
    });

    const eventStats = events.map((ev) => {
      const attendees = ev.rsvpEvents.reduce((acc, curr) => acc + curr.count, 0);
      return {
        id: ev.id,
        title: ev.title,
        attendees,
      };
    });

    // Dietary preferences breakdown
    const dietaryMap: Record<string, number> = {};
    for (const r of confirmedRsvps) {
      const pref = r.dietaryPreference || "Vegetarian";
      dietaryMap[pref] = (dietaryMap[pref] || 0) + r.totalAttending;
    }

    const dietaryStats = Object.keys(dietaryMap).map((key) => ({
      name: key,
      value: dietaryMap[key],
    }));

    // Logistics requests
    const hotelRequests = confirmedRsvps.filter((r) => r.needsHotelStay).length;
    const shuttleRequests = confirmedRsvps.filter((r) => r.needsShuttle).length;

    return NextResponse.json({
      totalGuests,
      totalInvitations: invitations.length,
      confirmedCount: confirmedRsvps.length,
      totalConfirmedAttendees,
      declinedCount: declinedRsvps.length,
      pendingCount,
      eventStats,
      dietaryStats,
      hotelRequests,
      shuttleRequests,
      recentRsvps: rsvps.slice(-5).reverse(),
    });
  } catch (err: any) {
    console.error("Stats API error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
