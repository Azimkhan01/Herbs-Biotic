"use client";

import { manrope } from "@/font/font";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import "./style.css";
import { MoveRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

// ✅ DATA ARRAY (this is what you wanted)
const faqData = [
  {
    id: "item-1",
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    id: "item-2",
    question: "What is Herbs Biotic?",
    answer:
      "Herbs Biotic is a natural wellness product designed to support your health and lifestyle.",
  },
  {
    id: "item-3",
    question: "How do I get started?",
    answer:
      "Simply explore our products and choose the one that fits your needs. We guide you step by step.",
  },
];

function QNA2() {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to({}, { duration: 1 }).to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      className={`${manrope.className} pb-30 bg-white w-full px-4 md:px-10 lg:px-20 py-16 flex flex-col md:flex-row gap-10 items-center`}
    >
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        {/* heading */}
        <div>
          <h2 className="text-teal-900 font-black text-3xl md:text-4xl leading-tight text-center md:text-left">
            <span>Do you have Questions?</span>
            <br />
            <span>We have the answers!</span>
          </h2>
        </div>

        {/* svg */}
        <div className="flex justify-center md:justify-start items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 180 500.7 120"
            className="w-40 md:w-56 lg:w-64 h-auto block"
          >
            <path
              ref={pathRef}
              d="M49.3,232.9c153.4-59.3,402.1-27.7,402.1-27.7"
              fill="none"
              stroke="#E1E53F"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* description */}
        <p className="text-center md:text-left text-teal-900/80 max-w-md">
          Everything you need to know about Herbs Biotic, our products, and how
          to get started. We’re here to make things simple.
        </p>

        {/* button */}
        <div className="flex justify-center md:justify-start mt-4">
          <button className="group relative overflow-hidden rounded-full px-8 py-4 flex items-center gap-4 bg-gray-100 text-teal-900 font-semibold">
            <span className="absolute right-8 w-10 h-10 bg-accent rounded-full transition-all duration-500 ease-out group-hover:w-[120%] group-hover:h-[120%] group-hover:right-[-10%] group-hover:top-[-10%]" />

            <p className="relative z-10 group-hover:text-black transition-colors">
              See all questions
            </p>

            <span className="relative z-10 bg-white rounded-full p-2">
              <MoveRight />
            </span>
          </button>
        </div>
      </div>

      {/* RIGHT SIDE (ACCORDION) */}
      <div className="w-full md:w-1/2">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-teal-900/10 pb-4"
            >
              <AccordionTrigger
                className="
            text-left 
            text-xl md:text-2xl lg:text-3xl 
            font-semibold 
            text-teal-900 
            py-6 
            hover:no-underline
          "
              >
                {item.question}
              </AccordionTrigger>

              <AccordionContent
                className="
            text-base md:text-lg 
            text-teal-900/70 
            leading-relaxed 
            pb-6
          "
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default QNA2;
