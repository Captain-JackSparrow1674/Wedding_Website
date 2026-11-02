"use client";

import React, { useState } from "react";
import { GoldDivider } from "@/components/common/GoldDivider";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the dress code for each ceremony?",
      a: "Traditional royal Indian attire is encouraged throughout the festivities! Haldi calls for sunshine yellows, Mehendi for emerald greens and festive pastels, Sangeet for glamorous metallics, velvets, and champagne gold, the Wedding Phere for regal reds, golds, and formal sherwanis/turbans, and Reception for Black Tie or imperial evening formalwear.",
    },
    {
      q: "What will the weather in Udaipur be like in December?",
      a: "Winter in Udaipur is pleasant and royal. Daytime temperatures average 22°C to 25°C with sunny skies. Evenings by Lake Pichola become crisp and chilly (around 9°C to 12°C). We recommend bringing an elegant pashmina, royal shawl, or velvet bandhgala jacket for outdoor evening events.",
    },
    {
      q: "Are boxed gifts or wedding presents accepted?",
      a: "Your presence, warm smiles, and gracious blessings are the greatest gifts we could ever ask for. In accordance with family tradition, we strictly request no boxed gifts.",
    },
    {
      q: "Will transport and airport shuttles be arranged?",
      a: "Yes! Complimentary luxury wedding coaches and private cars will operate between Udaipur Airport (UDR), Udaipur Railway Station, and our official partner hotels (The Leela Palace, Taj Lake Palace, Trident). Boat transfers across Lake Pichola run continuously for island palace events.",
    },
    {
      q: "Can dietary preferences and allergies be accommodated?",
      a: "Absolutely. Our royal banquets feature dedicated kitchens for Jain cuisine (no root vegetables, onions, or garlic), pure vegetarian satvik delicacies, halal delicacies, and vegan spreads. Please indicate your dietary preferences in your RSVP form so our culinary team is notified.",
    },
    {
      q: "What is the official wedding hashtag for photos?",
      a: "Please tag your beautiful moments with #RadhikaDevanshWedding and #RoyalUnionInUdaipur. We will have dedicated high-speed guest Wi-Fi and instant photo booths stationed across the venue.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#3B101F] text-[#FFF9F0] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs tracking-widest uppercase font-semibold text-[#D4AF75]">
            Everything You Need To Know
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-white mt-2">
            Frequently Asked Questions
          </h2>
          <GoldDivider variant="lotus" />
          <p className="font-serif-luxury text-base sm:text-lg text-[#FFF9F0]/80 italic">
            Helpful guidance to ensure your celebration in Udaipur is seamless and memorable.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="bg-[#2A0C16] border border-[#D4AF75]/30 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-white hover:text-[#D4AF75] transition-colors"
                >
                  <span className="font-royal text-base sm:text-lg font-bold">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF75] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#FFF9F0]/85 font-sans leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
