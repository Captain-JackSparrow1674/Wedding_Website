import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { RsvpPageClient } from "@/components/rsvp/RsvpPageClient";
import { WeddingEventItem } from "@/lib/types";
import { defaultEvents } from "@/lib/defaultData";

export default async function RsvpDedicatedPage() {
  let events: WeddingEventItem[] = defaultEvents;

  try {
    const eventsDb = await prisma.weddingEvent.findMany({
      orderBy: { orderIndex: "asc" },
    });

    if (eventsDb && eventsDb.length > 0) {
      events = eventsDb.map((e) => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        ceremonyDate: e.ceremonyDate.toISOString(),
        startTime: e.startTime,
        endTime: e.endTime,
        venueName: e.venueName,
        venueAddress: e.venueAddress,
        mapUrl: e.mapUrl,
        description: e.description,
        dressCode: e.dressCode,
        dressCodeColors: e.dressCodeColors,
        imageUrl: e.imageUrl,
        orderIndex: e.orderIndex,
      }));
    }
  } catch (error) {
    console.warn("Using default events fallback during build/database init:", error);
  }

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-[#211A19]">
      <Navbar />
      <RsvpPageClient events={events} />
      <Footer />
    </main>
  );
}
