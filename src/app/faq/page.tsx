import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FaqPageClient } from "@/components/faq/FaqPageClient";
import { HelpCircle } from "lucide-react";
import { GoldDivider } from "@/components/common/GoldDivider";

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F0] text-[#211A19]">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 px-4 sm:px-6 bg-gradient-to-b from-[#3B101F] to-[#211A19] text-[#FFF9F0] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,117,0.15)_0%,transparent_70%)]" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="w-14 h-14 rounded-full border border-[#D4AF75] bg-[#3B101F] shadow-gold flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-7 h-7 text-[#D4AF75]" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#D4AF75] font-bold block mb-1">
            Guest Assistance &amp; Guidance
          </span>
          <h1 className="font-royal text-3xl sm:text-5xl font-bold text-white tracking-wider">
            Frequently Asked Questions
          </h1>
          <GoldDivider variant="lotus" className="my-3" />
          <p className="font-serif-luxury text-base sm:text-lg text-[#FFF9F0]/85 italic max-w-xl mx-auto">
            Everything you need to know about attire, winter weather in Udaipur, gifts policy, and hospitality arrangements.
          </p>
        </div>
      </section>

      <FaqPageClient />

      <Footer />
    </main>
  );
}

