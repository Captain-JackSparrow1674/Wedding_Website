import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CoupleSection } from "@/components/couple/CoupleSection";
import { GoldDivider } from "@/components/common/GoldDivider";
import { Crown, Heart, Sparkles, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { defaultSettings } from "@/lib/defaultData";

export default async function StoryPage() {
  let settings = defaultSettings;

  const shouldQueryDb = !process.env.VERCEL || Boolean(process.env.DATABASE_URL);

  if (shouldQueryDb) {
    try {
      const settingsDb = await prisma.weddingSettings.findFirst();
      if (settingsDb) {
        settings = {
          id: settingsDb.id,
          brideName: settingsDb.brideName,
          groomName: settingsDb.groomName,
          brideParents: settingsDb.brideParents,
          groomParents: settingsDb.groomParents,
          weddingDate: settingsDb.weddingDate ? settingsDb.weddingDate.toISOString() : defaultSettings.weddingDate,
          weddingCity: settingsDb.weddingCity,
          heroTagline: settingsDb.heroTagline,
          musicUrl: settingsDb.musicUrl,
        };
      }
    } catch {
      // Graceful fallback to defaultSettings
    }
  }

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-[#211A19]">
      <Navbar />

      {/* Hero Banner for Story Page */}
      <section className="pt-32 pb-16 px-4 sm:px-6 bg-gradient-to-b from-[#3B101F] to-[#211A19] text-[#FFF9F0] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,117,0.15)_0%,transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-14 h-14 rounded-full border border-[#D4AF75] bg-[#3B101F] shadow-gold flex items-center justify-center mx-auto mb-4">
            <Crown className="w-7 h-7 text-[#D4AF75]" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#D4AF75] font-bold block mb-1">
            Heritage • Destiny • Sacred Love
          </span>
          <h1 className="font-royal text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-wider">
            Our Royal Love Story
          </h1>
          <GoldDivider variant="lotus" className="my-4" />
          <p className="font-serif-luxury text-base sm:text-xl text-[#FFF9F0]/85 italic max-w-2xl mx-auto">
            From an accidental encounter across library manuscripts at Oxford to the sacred Vedic fire in Udaipur, Rajasthan.
          </p>
        </div>
      </section>

      {/* Main Couple & Milestones */}
      <CoupleSection
        brideName={`${settings?.brideName || "Radhika"} Singhania`}
        groomName={`${settings?.groomName || "Devansh"} Rathore`}
        brideParents={settings?.brideParents || "Smt. Sunita & Shri Vikramaditya Singhania"}
        groomParents={settings?.groomParents || "Smt. Rajeshwari & Shri Mahendra Pratap Rathore"}
      />

      {/* The Proposal Chapter Feature Card */}
      <section className="py-20 bg-[#2A0C16] text-[#FFF9F0] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-gradient-to-b from-[#3B101F] to-[#1C060E] rounded-3xl border border-[#D4AF75]/50 p-8 sm:p-14 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-[#D4AF75] font-bold">
                The Defining Moment
              </span>
              <h2 className="font-royal text-2xl sm:text-4xl font-bold text-white mt-1">
                A Winter Proposal on Lake Pichola
              </h2>
              <GoldDivider variant="diamond" className="my-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden border border-[#D4AF75]/40 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                  alt="Lake Pichola Udaipur"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#FFF9F0]/85 leading-relaxed font-sans">
                <p>
                  On a quiet December evening in 2024, under a constellation of stars reflecting off Lake Pichola, Devansh chartered a private Rajput wooden boat laden with marigolds and brass diyas.
                </p>
                <p>
                  As the City Palace illuminated the midnight skyline, he presented a 120-year-old heirloom emerald ring and asked for her hand. With tears of joy and the quiet blessing of the water, Radhika said yes.
                </p>
                <div className="pt-4 flex items-center gap-3">
                  <Link
                    href="/events"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold text-xs uppercase tracking-wider shadow-gold hover:brightness-110"
                  >
                    View Ceremonies Itinerary
                  </Link>
                  <Link
                    href="/rsvp"
                    className="px-6 py-2.5 rounded-full border border-[#D4AF75] text-[#D4AF75] text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF75]/15"
                  >
                    RSVP to Celebrations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

