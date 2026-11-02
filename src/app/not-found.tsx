import Link from "next/link";
import { Crown, Compass, Home } from "lucide-react";
import { GoldDivider } from "@/components/common/GoldDivider";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#211A19] text-[#FFF9F0] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,117,0.15)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-lg text-center bg-gradient-to-b from-[#3B101F] to-[#1C060E] rounded-3xl p-8 sm:p-12 border border-[#D4AF75]/50 shadow-2xl">
        <div className="w-16 h-16 rounded-full border border-[#D4AF75] bg-[#3B101F] flex items-center justify-center mx-auto mb-4 text-[#D4AF75] shadow-gold">
          <Crown className="w-8 h-8" />
        </div>

        <span className="text-[10px] uppercase tracking-widest text-[#D4AF75] font-bold block mb-1">
          Palace Passage Not Found
        </span>
        <h1 className="font-royal text-4xl sm:text-5xl font-bold text-white mb-2">
          404
        </h1>
        <GoldDivider variant="diamond" className="my-3" />

        <p className="font-serif-luxury text-base text-[#FFF9F0]/80 italic mb-8">
          It appears you have wandered into a secluded wing of the royal palace. Allow us to escort you back to the main wedding festivities.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF75] via-[#F4E2BE] to-[#A57D3E] text-[#211A19] font-bold text-xs uppercase tracking-widest shadow-gold hover:brightness-110 active:scale-95 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return To Celebrations</span>
        </Link>
      </div>
    </div>
  );
}
