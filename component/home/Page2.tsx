"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmallCard from "./SmallCard";
import { MoveRight } from "lucide-react";
import "./style.css"
gsap.registerPlugin(ScrollTrigger);

export default function Page2() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;

    if (!path || !wrap) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const animate = () => {
      gsap.fromTo(
        path,
        { strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
        },
      );
    };

    ScrollTrigger.create({
      trigger: wrap,
      start: "top 80%",
      toggleActions: "play reset play reset",

      onEnter: animate,
      onEnterBack: animate,
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section className="relative my-20 overflow-hidden">
      {/* SVG BACKGROUND */}
      <div
        ref={wrapRef}
        className="absolute inset-0 z-0 w-full overflow-hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 1080"
          width="100%"
          height="auto"
        >
          <path
            ref={pathRef}
            d="M0,293c18.5-15.1,47.2-35.7,85.8-52.6,26-11.4,100.3-40.3,235.1-24.9,102.1,11.6,180.8,42,254.5,74.7,141.4,62.8,268.6,136.4,409.4,231.4,179.9,121.4,201.6,156.3,348.6,238.2,191.9,107.1,266.5,109.9,304.3,108.2,137.2-5.9,237.2-90.8,282.2-135.1"
            fill="none"
            stroke="#E1E53F"
            strokeWidth={100}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col gap-16 text-teal-900">
        {/* TOP CARDS */}
        <div className="flex flex-col gap-6">
          <div className="self-start">
            <SmallCard
              heading="Increased energy & vitality"
              description="The dog is more active and happier"
            />
          </div>

          <div className="self-end">
            <SmallCard
              heading="Healthy & shiny coat"
              description="External sign of proper nutrition"
            />
          </div>
        </div>

        {/* IMAGE (FIXED) */}
        <div className="flex justify-center">
          <img
            loading="lazy"
            src="/home/bowl.png"
            alt="bowl"
            className="w-full md:w-1/2 object-contain"
          />
        </div>

        {/* BOTTOM CARDS */}
        <div className="flex flex-col gap-6">
          <div className="self-start">
            <SmallCard
              heading="Increased energy & vitality"
              description="The dog is more active and happier"
            />
          </div>

          <div className="self-end">
            <SmallCard
              heading="Healthy & shiny coat"
              description="External sign of proper nutrition"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-30 mb-30">
        <button className="group relative overflow-hidden rounded-full px-10 py-4 flex items-center gap-6 bg-accent text-teal-900 font-semibold">
          {/* expanding circle */}
          <span className="absolute right-10 w-10 h-10 bg-white rounded-full transition-all duration-500 ease-out group-hover:w-[120%] group-hover:h-[120%] group-hover:rounded-full group-hover:right-[-10%] group-hover:top-[-10%]" />

          {/* text */}
          <p className="relative z-10 group-hover:text-black transition-colors">
            Learn more about us
          </p>

          {/* icon circle */}
          <span className="relative z-10 bg-white rounded-full p-2">
            <MoveRight />
          </span>
        </button>
      </div>
    </section>
  );
}
