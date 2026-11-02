"use client";

import React, { useState } from "react";
import { ChevronDown, Search, Sparkles, HelpCircle } from "lucide-react";
import { GoldDivider } from "@/components/common/GoldDivider";

export const FaqPageClient: React.FC = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("all");

  const faqs = [
    {
      category: "attire",
      q: "What is the dress code for each ceremony?",
      a: "Traditional royal Indian attire is encouraged throughout the festivities! Haldi calls for sunshine yellows, Mehendi for emerald greens and festive pastels, Sangeet for glamorous metallics, velvets, and champagne gold, the Wedding Phere for regal reds, golds, and formal sherwanis/turbans, and Reception for Black Tie or imperial evening formalwear.",
    },
    {
      category: "weather",
      q: "What will the weather in Udaipur be like in December?",
      a: "Winter in Udaipur is pleasant and royal. Daytime temperatures average 22°C to 25°C with sunny skies. Evenings by Lake Pichola become crisp and chilly (around 9°C to 12°C). We recommend bringing an elegant pashmina, royal shawl, or velvet bandhgala jacket for outdoor evening events.",
    },
    {
      category: "gifts",
      q: "Are boxed gifts or wedding presents accepted?",
      a: "Your presence, warm smiles, and gracious blessings are the greatest gifts we could ever ask for. In accordance with family tradition, we strictly request no boxed gifts.",
    },
    {
      category: "logistics",
      q: "Will transport and airport shuttles be arranged?",
      a: "Yes! Complimentary luxury wedding coaches and private cars will operate between Udaipur Airport (UDR), Udaipur Railway Station, and our official partner hotels (The Leela Palace, Taj Lake Palace, Trident). Boat transfers across Lake Pichola run continuously for island palace events.",
    },
    {
      category: "dining",
      q: "Can dietary preferences and allergies be accommodated?",
      a: "Absolutely. Our royal banquets feature dedicated kitchens for Jain cuisine (no root vegetables, onions, or garlic), pure vegetarian satvik delicacies, and vegan spreads. Please indicate your dietary preferences in your RSVP form so our culinary team is notified.",
    },
    {
      category: "media",
      q: "What is the official wedding hashtag for photos?",
      a: "Please tag your beautiful moments with #RadhikaDevanshWedding and #RoyalUnionInUdaipur. We will have dedicated high-speed guest Wi-Fi and instant photo booths stationed across the venue.",
    },
    {
      category: "logistics",
      q: "Is there valet parking available at the venue?",
      a: "Yes, dedicated royal valet parking is available at the Badi Pol gate and palace entrance. Please inform the concierge team if you require reserved priority parking.",
    },
    {
      category: "attire",
      q: "Will saree draping artists and turban stylists be available?",
      a: "Yes, the hospitality desks at each partner hotel (The Leela, Taj Lake Palace, Trident) will have certified professional safa/turban binders and saree/dupatta draping stylists complimentary for all wedding guests.",
    },
  ];

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "attire", label: "Attire & Dress Codes" },
    { id: "logistics", label: "Travel & Parking" },
    { id: "dining", label: "Cuisine & Diets" },
    { id: "weather", label: "Weather & Udaipur" },
    { id: "gifts", label: "Gifts Policy" },
  ];

  const filtered = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Search Input */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
        <input
          type="text"
          placeholder="Search question, dress code, travel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-full border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF75] shadow-sm"
        />
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
              activeCategory === c.id
                ? "bg-[#641C32] text-white shadow-md border border-[#D4AF75]"
                : "bg-[#EDE0CD]/70 text-[#211A19]/80 hover:bg-[#EDE0CD]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[#211A19]/60 font-serif-luxury">
            No matching questions found. Please check with our 24x7 Concierge Desk on the Contact page.
          </div>
        ) : (
          filtered.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="bg-white border border-[#D4AF75]/40 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-[#3B101F] hover:text-[#641C32] transition-colors"
                >
                  <span className="font-royal text-sm sm:text-base font-bold">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF75] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#211A19]/80 font-sans leading-relaxed border-t border-[#D4AF75]/20 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

