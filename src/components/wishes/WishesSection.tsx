"use client";

import React, { useState } from "react";
import { GoldDivider } from "@/components/common/GoldDivider";
import { GuestWishItem } from "@/lib/types";
import { Heart, Send, Sparkles, MessageCircleHeart } from "lucide-react";

interface WishesSectionProps {
  initialWishes: GuestWishItem[];
}

export const WishesSection: React.FC<WishesSectionProps> = ({ initialWishes }) => {
  const [wishes, setWishes] = useState<GuestWishItem[]>(initialWishes);
  const [guestName, setGuestName] = useState("");
  const [relation, setRelation] = useState("Family Friend");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestName, relation, message }),
      });

      const data = await res.json();
      if (res.ok && data.wish) {
        setWishes([data.wish, ...wishes]);
        setGuestName("");
        setMessage("");
        setFeedback("Your royal blessings have been beautifully added to the guestbook!");
      } else {
        setFeedback(data.error || "Failed to submit wish");
      }
    } catch (err) {
      setFeedback("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="py-24 bg-[#FFF9F0] text-[#211A19] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs tracking-widest uppercase font-semibold text-[#641C32]">
            Words of Grace & Love
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-[#3B101F] mt-2">
            The Royal Guestbook
          </h2>
          <GoldDivider variant="lotus" />
          <p className="font-serif-luxury text-base sm:text-lg text-[#211A19]/80 italic">
            Leave your warmest blessings and wishes for Radhika and Devansh.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form: Submit a Blessing */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#D4AF75]/50 shadow-royal">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#641C32] uppercase tracking-wider mb-2">
              <MessageCircleHeart className="w-4 h-4 text-[#D4AF75]" />
              Inscribe Your Blessing
            </div>
            <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#3B101F] mb-6">
              Send Your Wishes
            </h3>

            {feedback && (
              <div
                className={`p-4 rounded-xl text-xs sm:text-sm mb-6 ${
                  feedback.includes("added")
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-300"
                    : "bg-rose-50 text-rose-900 border border-rose-300"
                }`}
              >
                {feedback}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#641C32] mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aditi Rao or The Kapoor Family"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF75]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#641C32] mb-1.5">
                  Relation to Couple
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF75]"
                >
                  <option value="Family Elder">Family Elder</option>
                  <option value="Bride's Family">Bride's Family</option>
                  <option value="Groom's Family">Groom's Family</option>
                  <option value="Childhood Friend">Childhood Friend</option>
                  <option value="College Friend">College Friend</option>
                  <option value="Family Friend">Family Friend</option>
                  <option value="Colleague">Colleague / Associate</option>
                  <option value="Well-wisher">Well-wisher</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#641C32] mb-1.5">
                  Your Royal Blessing / Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share a heartfelt memory, blessing, or wish for the couple..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF75]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold text-xs uppercase tracking-widest shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Inscribing Blessing...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Inscribe Blessing</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Wall of Wishes */}
          <div className="lg:col-span-7 space-y-4 max-h-[580px] overflow-y-auto pr-2">
            {wishes.length === 0 ? (
              <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-[#D4AF75]/50 p-6">
                <Heart className="w-8 h-8 text-[#D4AF75] mx-auto mb-2 opacity-60" />
                <p className="text-sm text-[#211A19]/70 font-serif-luxury">
                  Be the first gracious guest to inscribe a royal blessing!
                </p>
              </div>
            ) : (
              wishes.map((w) => (
                <div
                  key={w.id}
                  className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#D4AF75]/40 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-royal text-base sm:text-lg font-bold text-[#3B101F]">
                        {w.guestName}
                      </h4>
                      {w.relation && (
                        <span className="text-[11px] text-[#641C32] font-semibold tracking-wide uppercase">
                          {w.relation}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#211A19]/50">
                      {new Date(w.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#211A19]/80 font-serif-luxury italic leading-relaxed pt-1">
                    “{w.message}”
                  </p>

                  <div className="mt-2 text-right">
                    <span className="text-[10px] text-[#D4AF75]">✦ ✦ ✦</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
