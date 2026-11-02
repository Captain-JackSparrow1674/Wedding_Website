"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, Play, Pause } from "lucide-react";

interface MusicPlayerProps {
  musicUrl?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicUrl = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b939db20.mp3?filename=indian-flute-and-sitar-ambient-110825.mp3",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt graceful play on first user interaction anywhere on page
    const handleFirstClick = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
      }
    };
    window.addEventListener("click", handleFirstClick, { once: true });
    return () => window.removeEventListener("click", handleFirstClick);
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Audio play blocked:", e));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause Wedding Shehnai Music" : "Play Wedding Shehnai Music"}
          className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#3B101F]/90 backdrop-blur-md border border-[#D4AF75] shadow-royal hover:scale-105 transition-all duration-300 text-[#FFF9F0]"
        >
          {/* Animated Gold Ring pulse */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-[#D4AF75]/60 animate-ping pointer-events-none" />
          )}

          <div className="w-7 h-7 rounded-full bg-[#D4AF75] text-[#3B101F] flex items-center justify-center font-bold">
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </div>

          <div className="flex flex-col text-left pr-1">
            <span className="text-[10px] tracking-widest uppercase text-[#D4AF75] font-semibold">
              {isPlaying ? "Playing Sitar & Flute" : "Wedding Music"}
            </span>
            <span className="text-xs font-serif text-[#FFF9F0]/90">
              {isPlaying ? "Royal Shehnai" : "Click to Play"}
            </span>
          </div>

          {/* Audio Visualizer Bars */}
          {isPlaying && (
            <div className="flex items-end gap-1 h-4 pl-1">
              <span className="w-0.5 bg-[#D4AF75] rounded-full animate-bounce h-2" style={{ animationDelay: "0ms" }} />
              <span className="w-0.5 bg-[#D4AF75] rounded-full animate-bounce h-4" style={{ animationDelay: "150ms" }} />
              <span className="w-0.5 bg-[#D4AF75] rounded-full animate-bounce h-3" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </button>
      </div>
    </>
  );
};
