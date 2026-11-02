import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { EventsSection } from "@/components/events/EventsSection";
import { WeddingEventItem } from "@/lib/types";
import { defaultEvents } from "@/lib/defaultData";

export default async function EventsDedicatedPage() {
  let events: WeddingEventItem[] = defaultEvents;

  const shouldQueryDb = !process.env.VERCEL || Boolean(process.env.DATABASE_URL);

  if (shouldQueryDb) {
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
    } catch {
      // Graceful fallback to defaultEvents on serverless/build
    }
  }

  return (
    <main className="min-h-screen bg-[#3B101F]">
      <Navbar />
      <div className="pt-20">
        <EventsSection events={events} />
      </div>
      <Footer />
    </main>
  );
}
