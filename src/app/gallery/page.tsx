import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { GallerySection } from "@/components/gallery/GallerySection";
import { GalleryImageItem } from "@/lib/types";
import { defaultGallery } from "@/lib/defaultData";

export default async function GalleryDedicatedPage() {
  let galleryImages: GalleryImageItem[] = defaultGallery;

  const shouldQueryDb = !process.env.VERCEL || Boolean(process.env.DATABASE_URL);

  if (shouldQueryDb) {
    try {
      const galleryDb = await prisma.galleryImage.findMany({
        orderBy: [{ isFeatured: "desc" }, { orderIndex: "asc" }],
      });

      if (galleryDb && galleryDb.length > 0) {
        galleryImages = galleryDb.map((g) => ({
          id: g.id,
          title: g.title,
          category: g.category,
          imageUrl: g.imageUrl,
          videoUrl: g.videoUrl,
          mediaType: (g.mediaType as "image" | "video") || "image",
          caption: g.caption,
          isFeatured: g.isFeatured,
          orderIndex: g.orderIndex,
        }));
      }
    } catch {
      // Graceful fallback to defaultGallery
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF9F0]">
      <Navbar />
      <div className="pt-20">
        <GallerySection images={galleryImages} />
      </div>
      <Footer />
    </main>
  );
}
