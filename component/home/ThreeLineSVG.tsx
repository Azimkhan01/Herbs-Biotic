"use client";

import { useEffect, useRef } from "react";

export default function AnimatedLogo() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svg.classList.remove("animate");

          // Force reflow
          svg.getBoundingClientRect();

          svg.classList.add("animate");
        } else {
          svg.classList.remove("animate");
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(svg);

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="svg-sequential h-35 w-35"
      viewBox="0 0 500.7 429.8"
    //   width={200}
    //   height={200}
    >
      <path
        className="draw-path"
        d="M180.7,212.8c28.8-43.5,38.3-84.9,38.3-84.9"
        style={{
          strokeDasharray: 93.5442,
          strokeDashoffset: 93.5442,
        }}
      />

      <path
        className="draw-path delay-1"
        d="M210.1,262.6s19.6-16.4,32.2-25.5c12.6-9.2,32.5-39.8,32.5-39.8"
        style={{
          strokeDasharray: 92.6495,
          strokeDashoffset: 92.6495,
        }}
      />

      <path
        className="draw-path delay-2"
        d="M240.9,301.8c30.4-23.6,79.1-25.5,79.1-25.5"
        style={{
          strokeDasharray: 84.238,
          strokeDashoffset: 84.238,
        }}
      />
    </svg>
  );
}
