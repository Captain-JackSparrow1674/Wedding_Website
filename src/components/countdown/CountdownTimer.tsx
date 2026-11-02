"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string | Date;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTime = (): TimeRemaining => {
    const diff = new Date(targetDate).getTime() - new Date().getTime();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: false,
    };
  };

  const [time, setTime] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(calculateTime());
    const interval = setInterval(() => {
      setTime(calculateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-6 py-4 opacity-70">
        <div className="w-16 h-20 bg-[#3B101F]/80 rounded-lg animate-pulse" />
        <div className="w-16 h-20 bg-[#3B101F]/80 rounded-lg animate-pulse" />
        <div className="w-16 h-20 bg-[#3B101F]/80 rounded-lg animate-pulse" />
        <div className="w-16 h-20 bg-[#3B101F]/80 rounded-lg animate-pulse" />
      </div>
    );
  }

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-5 py-4">
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-center">
          <div className="relative group">
            {/* Outer Gold Card Frame */}
            <div className="w-16 sm:w-20 md:w-24 h-20 sm:h-24 md:h-28 rounded-xl bg-gradient-to-b from-[#3B101F] to-[#211A19] border border-[#D4AF75]/50 shadow-royal flex flex-col items-center justify-center p-2 relative overflow-hidden transition-all duration-300 group-hover:border-[#D4AF75]">
              {/* Subtle top gold accent line */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF75] to-transparent" />
              
              {/* Digit */}
              <span className="font-royal text-2xl sm:text-3xl md:text-4xl font-bold text-gold-gradient tracking-wider">
                {String(unit.value).padStart(2, "0")}
              </span>

              {/* Label */}
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#FFF9F0]/70 font-medium mt-1">
                {unit.label}
              </span>
            </div>
          </div>

          {/* Separator dots */}
          {index < units.length - 1 && (
            <span className="text-[#D4AF75] font-royal text-xl sm:text-2xl px-1 sm:px-2 animate-pulse">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
