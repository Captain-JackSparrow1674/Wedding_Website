import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { WishesSection } from "@/components/wishes/WishesSection";
import { GuestWishItem } from "@/lib/types";
import { Crown, Heart, Sparkles, MessageCircleHeart } from "lucide-react";
import { GoldDivider } from "@/components/common/GoldDivider";
import { defaultWishes } from "@/lib/defaultData";

export default async function GuestbookPage() {
  let wishes: GuestWishItem[] = defaultWishes;

  try {
    const wishesDb = await prisma.guestWish.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
    });

    if (wishesDb && wishesDb.length > 0) {
      wishes = wishesDb.map((w) => ({
        id: w.id,
        guestName: w.guestName,
        message: w.message,
        relation: w.relation,
        isApproved: w.isApproved,
        createdAt: w.createdAt.toISOString(),
      }));
    }
  } catch (error) {
    console.warn("Using default wishes fallback during build/database init:", error);
  }

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-[#211A19]">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-14 px-4 sm:px-6 bg-gradient-to-b from-[#3B101F] to-[#211A19] text-[#FFF9F0] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,117,0.15)_0%,transparent_70%)]" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="w-14 h-14 rounded-full border border-[#D4AF75] bg-[#3B101F] shadow-gold flex items-center justify-center mx-auto mb-4">
            <MessageCircleHeart className="w-7 h-7 text-[#D4AF75]" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#D4AF75] font-bold block mb-1">
            Words of Blessings &amp; Ashirvaad
          </span>
          <h1 className="font-royal text-3xl sm:text-5xl font-bold text-white tracking-wider">
            The Royal Guestbook
          </h1>
          <GoldDivider variant="lotus" className="my-3" />
          <p className="font-serif-luxury text-base sm:text-lg text-[#FFF9F0]/85 italic max-w-xl mx-auto">
            Leave your warmest blessings, stories, and wishes for Radhika and Devansh as they unite their lives.
          </p>
        </div>
      </section>

      {/* Wishes Section */}
      <div className="py-8">
        <WishesSection initialWishes={wishes} />
      </div>

      <Footer />
    </main>
  );
}

