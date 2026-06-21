"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface CurveDividerProps {
  color?: string;
  className?: string;
  reverse?: boolean;
}

export default function CurveDivider({
  color = "#fff",
  className = "",
  reverse = false,
}: CurveDividerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width: 768px)",
        desktop: "(min-width: 769px)",
      },
      (context) => {
        const { mobile } = context.conditions!;

        // Smaller bulge on mobile
        const maxCurve = mobile ? 170 : 250;

        const curve = {
          y: reverse ? maxCurve : -maxCurve,
        };

        const updatePath = () => {
          pathRef.current?.setAttribute(
            "d",
            `
          M0,0
          Q720,${curve.y} 1440,0
          L1440,200
          L0,200
          Z
          `,
          );
        };

        updatePath();

        const tween = gsap.to(curve, {
          y: reverse ? -maxCurve : maxCurve,
          ease: "none",
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
          onUpdate: updatePath,
        });

        return () => tween.kill();
      },
    );

    return () => mm.revert();
  }, [reverse]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      className={`w-full h-[200px] overflow-visible ${className}`}
    >
      <path
        ref={pathRef}
        fill={color}
        d={
          reverse
            ? "M0,0 Q720,250 1440,0 L1440,200 L0,200 Z"
            : "M0,0 Q720,-250 1440,0 L1440,200 L0,200 Z"
        }
      />
    </svg>
  );
}
