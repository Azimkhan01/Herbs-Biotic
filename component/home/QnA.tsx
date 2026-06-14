"use client";

import { useRef } from "react";
import { manrope } from "@/font/font";
import "./style.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function QnA() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useGSAP(() => {
    const path = pathRef.current;
    const section = sectionRef.current;

    if (!path || !section) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,   // ✅ FIX: use wrapper, not path
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reset", // 🔥 replay every time

        onEnter: () => {
          gsap.fromTo(
            path,
            { strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power2.inOut",
            }
          );
        },

        onEnterBack: () => {
          gsap.fromTo(
            path,
            { strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power2.inOut",
            }
          );
        },
      });
    }, sectionRef);

    // 🔥 important for Next.js layout timing
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`mt-10 min-h-screen ${manrope.className}`}
    >
      {/* question */}
      <div className="p-4 flex justify-center w-full">
        <p className="text-teal-900 text-4xl text-center leading-14 md:w-1/2 tracking-wide font-semibold">
          Why <span className="font-black">Herb Biotics ?</span> Why the
          benefits they talk from alone their!
        </p>
      </div>

      {/* svg */}
      <div className="flex justify-center ">
        <svg
         className="draw-path"
          viewBox="0 0 500.7 429.8"
          width={390}
          height={300}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M80.2,213.1c41.4-17.7,98.3-28.7,153.6-27.4,11.1.2,23,1.1,31,5.1,12.1,6,10.7,16.4,4.2,24.4-11.9,14.6-56.9,33.3-68,28.3-10.1-4.6,4.8-13.1,15.4-17.2,58.9-23,161.8-24.4,204-7.1"
            fill="none"
            stroke="orangered"
            strokeWidth={10}
          />
        </svg>
      </div>

    {/* some description */}

<div className="text-teal-900 flex justify-center items-center font-serif leading-8 text-lg p-6">
    <p className="text-center md:w-1/2">The herbs biotics provides nefits for the health and development of the dog. From the moment the dog starts eating raw food, the first changes are immediately visible and within a few months its quality of life improves.</p>
</div>


    </section>
  );
}

export default QnA;