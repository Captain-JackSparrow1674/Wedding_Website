"use client";

import React, { useState, useEffect } from "react";
import { X, Check, Heart, Sparkles, Music, MapPin, Calendar, Users, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { WeddingEventItem } from "@/lib/types";

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: WeddingEventItem[];
  preselectedEventId?: string;
  initialGuestName?: string | null;
  initialGuestEmail?: string | null;
  initialGuestPhone?: string | null;
  initialGuestLimit?: number;
  token?: string | null;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  events,
  preselectedEventId,
  initialGuestName,
  initialGuestEmail,
  initialGuestPhone,
  initialGuestLimit = 2,
  token,
}) => {
  const [attending, setAttending] = useState<boolean>(true);
  const [name, setName] = useState(initialGuestName || "");
  const [email, setEmail] = useState(initialGuestEmail || "");
  const [phone, setPhone] = useState(initialGuestPhone || "");
  const [totalAttending, setTotalAttending] = useState<number>(initialGuestLimit);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [dietaryPreference, setDietaryPreference] = useState("Pure Vegetarian");
  const [allergies, setAllergies] = useState("");
  const [needsHotelStay, setNeedsHotelStay] = useState(false);
  const [needsShuttle, setNeedsShuttle] = useState(false);
  const [songRequest, setSongRequest] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize selected events
  useEffect(() => {
    if (events.length > 0) {
      if (preselectedEventId) {
        setSelectedEvents([preselectedEventId]);
      } else {
        setSelectedEvents(events.map((e) => e.id));
      }
    }
  }, [events, preselectedEventId]);

  useEffect(() => {
    if (initialGuestName) setName(initialGuestName);
    if (initialGuestEmail) setEmail(initialGuestEmail);
    if (initialGuestPhone) setPhone(initialGuestPhone);
    if (initialGuestLimit) setTotalAttending(initialGuestLimit);
  }, [initialGuestName, initialGuestEmail, initialGuestPhone, initialGuestLimit]);

  if (!isOpen) return null;

  const toggleEventSelection = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (attending && selectedEvents.length === 0) {
      setErrorMessage("Please select at least one ceremony you will attend.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token || null,
          name,
          email,
          phone,
          attending,
          totalAttending: attending ? Number(totalAttending) : 0,
          dietaryPreference: attending ? dietaryPreference : null,
          allergies: allergies || null,
          needsHotelStay: attending ? needsHotelStay : false,
          needsShuttle: attending ? needsShuttle : false,
          songRequest: songRequest || null,
          specialRequests: specialRequests || null,
          selectedEvents: attending ? selectedEvents : [],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        if (attending) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#D4AF75", "#641C32", "#FFF9F0", "#A57D3E"],
          });
        }
      } else {
        setErrorMessage(data.error || "Failed to submit RSVP");
      }
    } catch (err) {
      setErrorMessage("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl border-2 border-[#D4AF75]/60 shadow-2xl overflow-hidden my-6 text-[#211A19]"
      >
        {/* Header Ribbon */}
        <div className="bg-[#3B101F] text-[#FFF9F0] px-6 sm:px-8 py-5 flex items-center justify-between border-b border-[#D4AF75]/40">
          <div>
            <span className="text-[10px] tracking-widest uppercase text-[#D4AF75] font-bold block">
              Royal Wedding Celebrations
            </span>
            <h3 className="font-royal text-xl sm:text-2xl font-bold text-white">
              {submitted ? "RSVP Confirmation" : "Confirm Your Gracious Presence"}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close RSVP Modal"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#D4AF75] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#D4AF75]/20 border border-[#D4AF75] text-[#641C32] flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>

              <h4 className="font-royal text-2xl font-bold text-[#3B101F] mb-2">
                {attending
                  ? "Dhanyavaad! Your RSVP is Confirmed"
                  : "We Will Truly Miss You"}
              </h4>

              <p className="font-serif-luxury text-base text-[#211A19]/80 max-w-md mx-auto mb-6">
                {attending
                  ? `Respected ${name}, your royal confirmation for ${totalAttending} guest(s) has been graciously recorded. We look forward to greeting you in Udaipur!`
                  : `Dear ${name}, thank you for letting us know. Your warm blessings remain deeply cherished by Radhika and Devansh.`}
              </p>

              {attending && (
                <div className="bg-[#FFF9F0] p-4 rounded-2xl border border-[#D4AF75]/40 max-w-md mx-auto text-left text-xs space-y-2 mb-6">
                  <div className="flex justify-between border-b border-[#D4AF75]/20 pb-1.5">
                    <span className="text-[#641C32] font-semibold">Guest Quota:</span>
                    <span>{totalAttending} Guest(s)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D4AF75]/20 pb-1.5">
                    <span className="text-[#641C32] font-semibold">Dietary Preference:</span>
                    <span>{dietaryPreference}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-[#641C32] font-semibold">Ceremonies Selected:</span>
                    <span>{selectedEvents.length} Events</span>
                  </div>
                </div>
              )}

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold text-xs uppercase tracking-widest shadow-gold"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Attendance Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#641C32] mb-2">
                  Will you be attending the wedding celebrations? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
                      attending
                        ? "bg-[#641C32] text-white border-[#641C32] shadow-md"
                        : "bg-white text-[#211A19]/80 border-gray-300 hover:border-[#641C32]"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    Joyfully Attending
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
                      !attending
                        ? "bg-[#3B101F] text-white border-[#3B101F] shadow-md"
                        : "bg-white text-[#211A19]/80 border-gray-300 hover:border-[#3B101F]"
                    }`}
                  >
                    <X className="w-4 h-4" />
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#641C32] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#641C32] mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#641C32] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                />
              </div>

              {attending && (
                <>
                  {/* Guest Count */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#641C32]">
                        Total Attending Guests (Including You)
                      </label>
                      <span className="text-[11px] text-[#D4AF75] font-semibold">
                        Limit: Up to {initialGuestLimit}
                      </span>
                    </div>
                    <select
                      value={totalAttending}
                      onChange={(e) => setTotalAttending(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                    >
                      {Array.from({ length: Math.max(initialGuestLimit, 5) }).map(
                        (_, idx) => (
                          <option key={idx + 1} value={idx + 1}>
                            {idx + 1} {idx === 0 ? "Person" : "Guests / Family Members"}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Ceremony Checkboxes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#641C32] mb-2">
                      Which Ceremonies Will You Grace With Your Presence? *
                    </label>
                    <div className="space-y-2">
                      {events.map((ev) => {
                        const isChecked = selectedEvents.includes(ev.id);
                        return (
                          <div
                            key={ev.id}
                            onClick={() => toggleEventSelection(ev.id)}
                            className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs sm:text-sm transition-all ${
                              isChecked
                                ? "bg-[#3B101F]/10 border-[#641C32] font-semibold text-[#3B101F]"
                                : "bg-white border-gray-200 text-gray-600 hover:border-[#D4AF75]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center border ${
                                  isChecked
                                    ? "bg-[#641C32] border-[#641C32] text-white"
                                    : "border-gray-400 bg-white"
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <div>
                                <span className="block font-medium">{ev.title}</span>
                                <span className="text-[11px] text-gray-500 font-normal">
                                  {ev.startTime} • {ev.venueName.split(",")[0]}
                                </span>
                              </div>
                            </div>
                            <span className="text-[11px] text-[#D4AF75] font-semibold">
                              {new Date(ev.ceremonyDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dietary Preferences */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#641C32] mb-1">
                        Dietary Preference
                      </label>
                      <select
                        value={dietaryPreference}
                        onChange={(e) => setDietaryPreference(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                      >
                        <option value="Pure Vegetarian">Pure Vegetarian (Satvik)</option>
                        <option value="Jain (No Root Veggies/Onion/Garlic)">
                          Strict Jain (No Onions/Garlic/Root Vegetables)
                        </option>
                        <option value="Non-Vegetarian">Non-Vegetarian (Imperial Dishes)</option>
                        <option value="Vegan">Vegan (Plant-Based)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#641C32] mb-1">
                        Allergies (If Any)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Gluten, Peanuts, Dairy"
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                      />
                    </div>
                  </div>

                  {/* Logistics checkboxes: Hotel & Shuttle */}
                  <div className="bg-[#FFF9F0] p-4 rounded-xl border border-[#D4AF75]/30 space-y-2 text-xs">
                    <span className="font-bold text-[#641C32] uppercase tracking-wider block mb-1">
                      Travel & Accommodation Support
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={needsHotelStay}
                        onChange={(e) => setNeedsHotelStay(e.target.checked)}
                        className="w-4 h-4 text-[#641C32] rounded focus:ring-[#D4AF75]"
                      />
                      <span>We require hotel room assistance / reserved wedding suite block</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={needsShuttle}
                        onChange={(e) => setNeedsShuttle(e.target.checked)}
                        className="w-4 h-4 text-[#641C32] rounded focus:ring-[#D4AF75]"
                      />
                      <span>We would like airport / railway station chauffeur pickup assistance</span>
                    </label>
                  </div>

                  {/* Sangeet Song Request */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#641C32] mb-1">
                      Sangeet Song Request (What makes you dance?)
                    </label>
                    <div className="relative">
                      <Music className="w-4 h-4 text-[#D4AF75] absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. Gallan Goodiyaan, London Thumakda, Kesariya"
                        value={songRequest}
                        onChange={(e) => setSongRequest(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Special Requests or Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#641C32] mb-1">
                  Special Requests or Note to Couple
                </label>
                <textarea
                  rows={2}
                  placeholder="Wheelchair assistance, child high chair, or personal note..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF75]/50 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF75] outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF75] via-[#F4E2BE] to-[#A57D3E] text-[#211A19] font-bold text-xs sm:text-sm uppercase tracking-widest shadow-gold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Recording RSVP...</span>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-current" />
                      <span>Submit Royal RSVP</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
