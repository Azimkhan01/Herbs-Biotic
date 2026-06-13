"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface CurveDividerProps {
  color?: string;
  className?: string;
  direction?: "up" | "down";
}

export default function CurveDivider({
  color = "#fff",
  className = "",
  direction = "up",
}: CurveDividerProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const curve = {
      y: direction === "up" ? -150 : 150,
    };

    const targetY = direction === "up" ? 150 : -150;

    const updatePath = () => {
      pathRef.current?.setAttribute(
        "d",
        `
        M0,0
        Q720,${curve.y} 1440,0
        L1440,200
        L0,200
        Z
      `
      );
    };

    updatePath();

    gsap.to(curve, {
      y: targetY,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      onUpdate: updatePath,
    });
  }, [direction]);

  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      className={`w-full h-[200px] ${className}`}
    >
      <path
        ref={pathRef}
        fill={color}
        d="M0,0 Q720,-150 1440,0 L1440,200 L0,200 Z"
      />
    </svg>
  );
}