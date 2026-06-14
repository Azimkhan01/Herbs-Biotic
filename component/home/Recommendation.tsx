"use client";

import { useRef } from "react";
import CurveDivider from "../common/Wave";
import { manrope } from "@/font/font";
import "./style.css";
import AnimatedLogo from "./ThreeLineSVG";
import CategoryToggle from "./CategoryToggle";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CategoryProvider } from "@/context/CategoryToggleContext";
import CategoryWiseRecommendation from "./CategoryWiseRecommendation";

gsap.registerPlugin(ScrollTrigger);

function Recommendation() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elements = gsap.utils.toArray(".reveal-up");

      elements.forEach((el: any) => {
        gsap.fromTo(
          el,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef}>
      <CurveDivider color="#fff" />

      <section
        className={`
          min-h-screen
          bg-white
          p-6 md:p-10
          ${manrope.className}
          font-semibold
          tracking-widest
          flex
          flex-col
          gap-y-10 pb-21
        `}
      >
        {/* Heading */}
        <div className="flex gap-x-10 gap-y-0 flex-col-reverse md:flex-row">
          <div className="flex items-end reveal-up">
            <p className="text-3xl md:text-4xl flex flex-col gap-y-5 text-teal-900">
              <span>
                Made with <span className="font-black">love</span>,
              </span>
              <span>taken with care!</span>
            </p>
          </div>

          <div className="self-end md:self-auto reveal-up">
            <AnimatedLogo />
          </div>
        </div>

        {/* Description */}
        <div className="flex justify-end w-full reveal-up">
          <p className="md:w-2/5 text-teal-900 font-black">
            Discover complete BARF recipes for your dog or cat – ready to serve!
          </p>
        </div>

        {/* Category Toggle */}
        <CategoryProvider>
          <div className="reveal-up">
            <CategoryToggle />
          </div>
          <CategoryWiseRecommendation />
        </CategoryProvider>
      </section>

      <CurveDivider color="#F3F4F6" className="bg-white" />
    </div>
  );
}

export default Recommendation;
