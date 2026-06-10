"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaveDivider from "../common/waive";

gsap.registerPlugin(ScrollTrigger);

export default function Recommendation() {
  const sectionRef = useRef<HTMLElement>(null);
  const topWaveRef = useRef<SVGPathElement>(null);
  const bottomWaveRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (
      !sectionRef.current ||
      !topWaveRef.current ||
      !bottomWaveRef.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(
      topWaveRef.current,
      {
        attr: {
          d: "M0,200 C250,0 1190,0 1440,200 L1440,200 L0,200 Z",
        },
        ease: "none",
      },
      0
    );

    tl.to(
      bottomWaveRef.current,
      {
        attr: {
          d: "M0,200 C250,0 1190,0 1440,200 L1440,200 L0,200 Z",
        },
        ease: "none",
      },
      0
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white"
    >
      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full -translate-y-[99%]">
        <WaveDivider
          ref={topWaveRef}
          topColor="#F3F4F6"
          bottomColor="#FFFFFF"
        />
      </div>

      

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <h2 className="text-6xl font-bold">
          Recommendation
        </h2>
      </div>
     

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full translate-y-[99%]">
        <WaveDivider
          ref={bottomWaveRef}
          topColor="#F3F4F6"
          bottomColor="#FFFFFF"
          className="rotate-180"
        />
      </div>
    </section>
  );
}