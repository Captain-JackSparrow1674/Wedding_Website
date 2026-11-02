import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const guests = await prisma.guest.findMany({
      include: {
        invitations: true,
        rsvps: {
          include: {
            eventsAttending: {
              include: {
                weddingEvent: true,
              },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    const headers = [
      "Guest Name",
      "Family Name",
      "Phone",
      "Email",
      "Guest Limit",
      "Invitation Token",
      "Invitation Status",
      "RSVP Attending",
      "Total Attending",
      "Events Attending",
      "Dietary Preference",
      "Allergies",
      "Hotel Needed",
      "Shuttle Needed",
      "Song Request",
      "Special Notes",
    ];

    const rows = guests.map((g) => {
      const inv = g.invitations[0];
      const rsvp = g.rsvps[0];
      const eventsStr = rsvp?.eventsAttending?.map((e) => e.weddingEvent?.title).join(" | ") || "N/A";

      const escape = (val: any) => `"${String(val || "").replace(/"/g, '""')}"`;

      return [
        escape(g.name),
        escape(g.familyName),
        escape(g.phone),
        escape(g.email),
        escape(g.guestLimit),
        escape(inv?.token || ""),
        escape(inv?.status || "NO_INVITE"),
        escape(rsvp ? (rsvp.attending ? "YES" : "NO") : "PENDING"),
        escape(rsvp?.totalAttending || 0),
        escape(eventsStr),
        escape(rsvp?.dietaryPreference || ""),
        escape(rsvp?.allergies || ""),
        escape(rsvp?.needsHotelStay ? "YES" : "NO"),
        escape(rsvp?.needsShuttle ? "YES" : "NO"),
        escape(rsvp?.songRequest || ""),
        escape(rsvp?.specialRequests || g.notes || ""),
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="Royal_Wedding_Guests_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err: any) {
    console.error("CSV Export error:", err);
    return NextResponse.json({ error: "Failed to export CSV" }, { status: 500 });
  }
}
