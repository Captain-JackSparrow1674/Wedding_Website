import React from "react";

interface GoldDividerProps {
  className?: string;
  variant?: "lotus" | "star" | "diamond" | "simple";
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
  className = "",
  variant = "lotus",
}) => {
  return (
    <div className={`flex items-center justify-center my-6 gap-3 ${className}`}>
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF75] to-[#D4AF75]" />
      
      {variant === "lotus" && (
        <span className="text-[#D4AF75] text-lg select-none">
          🪷
        </span>
      )}
      {variant === "diamond" && (
        <span className="text-[#D4AF75] text-sm select-none">
          ✦ ❖ ✦
        </span>
      )}
      {variant === "star" && (
        <span className="text-[#D4AF75] text-xs select-none">
          ✧
        </span>
      )}
      {variant === "simple" && (
        <span className="w-2 h-2 rounded-full bg-[#D4AF75]" />
      )}

      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#D4AF75] to-[#D4AF75]" />
    </div>
  );
};
