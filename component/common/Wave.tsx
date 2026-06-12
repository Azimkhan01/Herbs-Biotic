"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface WaveProps {
  direction?: "up" | "down";
  color?: string;
  className?: string;
}

export default function Wave({
  direction = "down",
  color = "#fff",
  className = "",
}: WaveProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const startLeft = direction === "down" ? 180 : 20;
    const startRight = direction === "down" ? 20 : 180;

    const endLeft = direction === "down" ? 20 : 180;
    const endRight = direction === "down" ? 180 : 20;

    const updatePath = (leftY: number, rightY: number) => {
      pathRef.current?.setAttribute(
        "d",
        `M0,100
         C360,${leftY}
         1080,${rightY}
         1440,100
         L1440,200
         L0,200
         Z`
      );
    };

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: ({ progress }) => {
        const leftY = gsap.utils.interpolate(
          startLeft,
          endLeft,
          progress
        );

        const rightY = gsap.utils.interpolate(
          startRight,
          endRight,
          progress
        );

        updatePath(leftY, rightY);
      },
    });

    return () => trigger.kill();
  }, [direction]);

  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      className={`w-full h-[200px]  ${className}`}
    >
      <path
      
        ref={pathRef}
        fill={color}
        d={
          direction === "down"
            ? "M0,100 C360,180 1080,20 1440,100 L1440,200 L0,200 Z"
            : "M0,100 C360,20 1080,180 1440,100 L1440,200 L0,200 Z"
        }
      />
    </svg>
  );
}