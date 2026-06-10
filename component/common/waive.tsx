"use client";

import { forwardRef } from "react";

interface WaveDividerProps {
  topColor: string;
  bottomColor: string;
  className?: string;
}

const WaveDivider = forwardRef<SVGPathElement, WaveDividerProps>(
  ({ topColor, bottomColor, className = "" }, ref) => {
    return (
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className={`w-full h-[200px] ${className}`}
      >
        {/* Outside color */}
        <rect
          width="1440"
          height="200"
          fill={topColor}
        />

        {/* Wave color */}
        <path
          ref={ref}
          fill={bottomColor}
          d="M0,200 C480,200 960,200 1440,200 L1440,200 L0,200 Z"
        />
      </svg>
    );
  }
);

WaveDivider.displayName = "WaveDivider";

export default WaveDivider;