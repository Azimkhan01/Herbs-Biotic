"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { archivo_black } from "@/font/font";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width:768px)",
        desktop: "(min-width:769px)",
      },
      (context) => {
        const { mobile } = context.conditions!;

        gsap.to(sectionRef.current, {
          scale: mobile ? 0.94 : 0.88,
          borderRadius: mobile ? 30 : 50,
          ease: "none",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen m-2.5 overflow-hidden rounded-[50px] bg-[#94A26D] will-change-transform"
    >
      {/* Background Image */}
      <img
        src="/home/Hero.PNG"
        alt="Hero Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <h1
          className={`${archivo_black.className} text-center uppercase tracking-wider text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl`}
        >
          Herbs Biotic
        </h1>

        <p
          className={`mt-4 text-xl font-bold text-white ${archivo_black.className}`}
        >
          Pure Herbs Pure Happiness
        </p>

        <button className="mt-10 flex items-center gap-4 rounded-full bg-white px-6 py-4 font-black text-teal-900 transition hover:scale-105">
          <span>Discover Products</span>

          <span className="rounded-full bg-[#E1E53F] p-1">
            <ArrowRight />
          </span>
        </button>
      </div>
    </section>
  );
}