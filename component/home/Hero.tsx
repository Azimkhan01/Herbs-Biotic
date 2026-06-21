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
        mobile: "(max-width: 768px)",
        desktop: "(min-width: 769px)",
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
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/home/goat.mp4" type="video/mp4" />
      </video>

      {/* Optional Dark Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full items-center justify-center px-6">
        <h1
          className={`${archivo_black.className} text-center uppercase tracking-wider text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl`}
        >
          Herbs Biotic
        </h1>
        <div>

          <div>
            <button title="t" className="rounded-full p-4 items-center justify-center text-teal-900 font-black flex gap-4 bg-white">
             <p>
               Discover Products
             </p>
             <p className="bg-[#E1E53F] rounded-full p-1">
              <ArrowRight/>
             </p>
            </button>
          </div>


        </div>
      </div>
    </section>
  );
}