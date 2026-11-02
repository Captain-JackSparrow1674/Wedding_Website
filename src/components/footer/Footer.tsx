"use client";

import React from "react";
import Link from "next/link";
import { Crown, Heart, MapPin, Phone, Mail, Sparkles, ShieldCheck } from "lucide-react";
import { GoldDivider } from "@/components/common/GoldDivider";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#18070D] text-[#FFF9F0] border-t border-[#D4AF75]/40 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Monogram Seal */}
        <div className="w-16 h-16 rounded-full border-2 border-[#D4AF75] bg-[#3B101F] shadow-gold flex items-center justify-center mx-auto mb-4">
          <Crown className="w-8 h-8 text-[#D4AF75]" />
        </div>

        <h3 className="font-royal text-2xl sm:text-3xl font-bold text-white tracking-widest">
          Radhika &amp; Devansh
        </h3>
        <p className="font-serif-luxury italic text-sm text-[#D4AF75] mt-1">
          #RadhikaDevanshWedding • Udaipur 2026
        </p>

        <GoldDivider variant="lotus" className="my-6" />

        {/* Family Blessings Quote */}
        <p className="font-serif-luxury text-base sm:text-lg max-w-xl mx-auto text-[#FFF9F0]/80 italic mb-8">
          “May the seven sacred vows bind our hearts in enduring love, dharma, and royal grace.”
        </p>

        {/* Contacts & Concierge */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#FFF9F0]/70 mb-10">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF75]" />
            <span>The City Palace, Lake Pichola, Udaipur, Rajasthan</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#D4AF75]" />
            <span>Concierge: +91 98200 12345</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#D4AF75]" />
            <span>concierge@royalwedding.com</span>
          </div>
        </div>

        {/* Navigation links & Admin */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#FFF9F0]/70 border-t border-white/10 pt-6">
          <Link href="/" className="hover:text-[#D4AF75] transition-colors">Home</Link>
          <Link href="/story" className="hover:text-[#D4AF75] transition-colors">Our Story</Link>
          <Link href="/events" className="hover:text-[#D4AF75] transition-colors">Ceremonies</Link>
          <Link href="/gallery" className="hover:text-[#D4AF75] transition-colors">Royal Gallery</Link>
          <Link href="/venue" className="hover:text-[#D4AF75] transition-colors">Venue &amp; Travel</Link>
          <Link href="/guestbook" className="hover:text-[#D4AF75] transition-colors">Guestbook</Link>
          <Link href="/faq" className="hover:text-[#D4AF75] transition-colors">FAQ</Link>
          <Link href="/contact" className="hover:text-[#D4AF75] transition-colors">Concierge Desk</Link>
          <Link href="/rsvp" className="hover:text-[#D4AF75] transition-colors font-semibold text-[#D4AF75]">RSVP Portal</Link>
          <Link href="/admin" className="text-[#D4AF75] hover:underline flex items-center gap-1 font-semibold ml-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Portal
          </Link>
        </div>

        <div className="text-[11px] text-[#FFF9F0]/40 mt-8">
          Designed with royal devotion for Radhika &amp; Devansh’s Wedding Celebrations. All rights reserved © 2026.
        </div>
      </div>
    </footer>
  );
};
