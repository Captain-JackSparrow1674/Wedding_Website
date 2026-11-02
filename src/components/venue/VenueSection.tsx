"use client";

import React from "react";
import { GoldDivider } from "@/components/common/GoldDivider";
import { MapPin, Plane, Train, Car, Phone, Mail, Navigation, Hotel, ShieldCheck } from "lucide-react";

export const VenueSection: React.FC = () => {
  const accommodations = [
    {
      name: "The Leela Palace Udaipur",
      tier: "Primary Family & VIP Suites",
      distance: "Lake Pichola (Boat Transfer)",
      perk: "Special Wedding Rate Code: ROYALUNION26",
      phone: "+91 294 670 1234",
    },
    {
      name: "Taj Lake Palace",
      tier: "Historic Island Sanctuary",
      distance: "5 mins via private jetty",
      perk: "Complimentary breakfast & butler service",
      phone: "+91 294 242 8800",
    },
    {
      name: "Trident Hotel, Udaipur",
      tier: "Guest Wings & Accommodations",
      distance: "10 mins drive to City Palace",
      perk: "Shuttle coaches running hourly",
      phone: "+91 294 243 5400",
    },
  ];

  return (
    <section id="venue" className="py-24 bg-[#211A19] text-[#FFF9F0] relative overflow-hidden">
      {/* Subtle royal background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF75]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#641C32]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-widest uppercase font-semibold text-[#D4AF75]">
            Destination & Royal Logistics
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-white mt-2">
            The City of Lakes, Udaipur
          </h2>
          <GoldDivider variant="lotus" />
          <p className="font-serif-luxury text-base sm:text-lg text-[#FFF9F0]/80 italic">
            Celebrating amidst 400 years of Rajput heritage, shimmering lakes, and marble courtyards.
          </p>
        </div>

        {/* Grand Palace Venue Showcase Card */}
        <div className="bg-gradient-to-b from-[#2A0C16] to-[#1C060E] rounded-3xl border border-[#D4AF75]/40 shadow-2xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto min-h-[340px]">
              <img
                src="/images/gallery/highlights-1.jpg"
                alt="City Palace Udaipur"
                onError={(e) => {
                  e.currentTarget.src = "/images/gallery/couple-1.jpg";
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C060E] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#2A0C16]" />
            </div>

            <div className="p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D4AF75] font-bold block mb-2">
                  Principal Wedding Destination
                </span>
                <h3 className="font-royal text-2xl sm:text-3xl font-bold text-white mb-3">
                  The City Palace Complex & Jagmandir
                </h3>
                <p className="text-xs sm:text-sm text-[#FFF9F0]/80 leading-relaxed font-sans mb-6">
                  Founded by Maharana Udai Singh II in 1559, this majestic palace stands perched over Lake Pichola. The ceremonies will transition between the sacred Zenana Mahal, the lakefront courtyards, and the island palace of Jagmandir.
                </p>

                <div className="space-y-3 bg-[#3B101F]/60 p-4 rounded-xl border border-[#D4AF75]/20 text-xs sm:text-sm mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#D4AF75] shrink-0 mt-0.5" />
                    <span>City Palace Complex, Old City, Udaipur, Rajasthan 313001, India</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Car className="w-4 h-4 text-[#D4AF75] shrink-0" />
                    <span>Valet parking available at Badi Pol & Palace Entrance Gate</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://maps.google.com/?q=City+Palace+Udaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold text-xs uppercase tracking-wider shadow-gold hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Travel & Transit Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#2A0C16] p-6 rounded-2xl border border-[#D4AF75]/30 shadow-md">
            <div className="w-10 h-10 rounded-full bg-[#3B101F] border border-[#D4AF75] flex items-center justify-center text-[#D4AF75] mb-4">
              <Plane className="w-5 h-5" />
            </div>
            <h4 className="font-royal text-lg font-bold text-white mb-2">By Air</h4>
            <p className="text-xs text-[#FFF9F0]/80 leading-relaxed font-sans mb-3">
              Maharana Pratap Airport (UDR) is located 24 km (approx. 40 mins) from the venue. Frequent flights operate daily from Delhi, Mumbai, Jaipur, and Bengaluru.
            </p>
            <span className="text-[11px] text-[#D4AF75] font-semibold block">
              Dedicated wedding chauffeur pickups available upon request.
            </span>
          </div>

          <div className="bg-[#2A0C16] p-6 rounded-2xl border border-[#D4AF75]/30 shadow-md">
            <div className="w-10 h-10 rounded-full bg-[#3B101F] border border-[#D4AF75] flex items-center justify-center text-[#D4AF75] mb-4">
              <Train className="w-5 h-5" />
            </div>
            <h4 className="font-royal text-lg font-bold text-white mb-2">By Train</h4>
            <p className="text-xs text-[#FFF9F0]/80 leading-relaxed font-sans mb-3">
              Udaipur City Railway Station is only 4 km (15 mins) from City Palace. Direct premium trains including Mewar Express and Vande Bharat connect directly.
            </p>
            <span className="text-[11px] text-[#D4AF75] font-semibold block">
              Pre-arranged transport desk available at railway arrival exit.
            </span>
          </div>

          <div className="bg-[#2A0C16] p-6 rounded-2xl border border-[#D4AF75]/30 shadow-md">
            <div className="w-10 h-10 rounded-full bg-[#3B101F] border border-[#D4AF75] flex items-center justify-center text-[#D4AF75] mb-4">
              <Car className="w-5 h-5" />
            </div>
            <h4 className="font-royal text-lg font-bold text-white mb-2">Local Shuttles</h4>
            <p className="text-xs text-[#FFF9F0]/80 leading-relaxed font-sans mb-3">
              Complimentary air-conditioned wedding shuttles will run on loop every 30 minutes between partner hotels and ceremonial venues throughout the festivities.
            </p>
            <span className="text-[11px] text-[#D4AF75] font-semibold block">
              Boat transfers across Lake Pichola run non-stop for island events.
            </span>
          </div>
        </div>

        {/* Accommodation Guide */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-royal text-2xl font-bold text-white">
              Accommodations & Room Blocks
            </h3>
            <p className="text-xs sm:text-sm text-[#FFF9F0]/70 mt-1">
              Preferential wedding rates have been reserved for our esteemed guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accommodations.map((acc) => (
              <div
                key={acc.name}
                className="bg-[#2A0C16] p-6 rounded-2xl border border-[#D4AF75]/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#D4AF75] font-semibold uppercase tracking-wider mb-1">
                    <Hotel className="w-4 h-4" />
                    {acc.tier}
                  </div>
                  <h4 className="font-royal text-xl font-bold text-white mb-2">
                    {acc.name}
                  </h4>
                  <p className="text-xs text-[#FFF9F0]/80 mb-4 font-sans">
                    {acc.distance}
                  </p>
                  <div className="p-3 bg-[#3B101F] rounded-lg text-xs text-[#D4AF75] font-medium mb-4 border border-[#D4AF75]/20">
                    {acc.perk}
                  </div>
                </div>

                <div className="text-xs text-[#FFF9F0]/70 border-t border-white/10 pt-3 flex items-center justify-between">
                  <span>Front Desk:</span>
                  <a href={`tel:${acc.phone}`} className="text-[#D4AF75] hover:underline font-semibold">
                    {acc.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Royal Concierge Helpline Card */}
        <div className="bg-gradient-to-r from-[#3B101F] via-[#4A1527] to-[#3B101F] rounded-2xl p-6 sm:p-8 border border-[#D4AF75] shadow-royal flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF75] font-bold mb-1">
              <ShieldCheck className="w-4 h-4" />
              Royal Hospitality & Concierge Desk
            </div>
            <h4 className="font-royal text-xl sm:text-2xl font-bold text-white">
              Need Assistance With Travel or Stays?
            </h4>
            <p className="text-xs sm:text-sm text-[#FFF9F0]/80 mt-1 max-w-xl">
              Our 24x7 dedicated wedding hospitality team is at your royal service for flight pick-ups, saree draping artists, or special assistance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+919820012345"
              className="px-5 py-2.5 rounded-full bg-[#211A19] border border-[#D4AF75] text-[#D4AF75] text-xs font-semibold tracking-wider uppercase hover:bg-[#D4AF75] hover:text-[#211A19] transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 98200 12345
            </a>
            <a
              href="https://wa.me/919820012345?text=Hello%20Royal%20Wedding%20Concierge,%20I%20need%20assistance%20with%20travel%20arrangements"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
