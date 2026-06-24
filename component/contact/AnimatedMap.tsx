"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AnimatedMapProps {
  location?: string;
}

export default function AnimatedMap({
  location = "Mumbai Maharashtra India",
}: AnimatedMapProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !mapWrapperRef.current) return;

      gsap.fromTo(
        mapWrapperRef.current,
        {
          scale: 1,
          y: 0,
          borderRadius: "0px",
        },
        {
          scale: 0.85,
          y: -40,
          borderRadius: "40px",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1200",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] "
    >
      {/* Sticky Area */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          ref={mapWrapperRef}
          className="
            h-screen
            w-screen
            overflow-hidden
            shadow-2xl
            will-change-transform
          "
        >
          <iframe
            title="Google Map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              location
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}