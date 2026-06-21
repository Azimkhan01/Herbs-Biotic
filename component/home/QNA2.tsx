"use client";

import { manrope } from "@/font/font";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import "./style.css";

import {
  MoveRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    id: "1",
    question: "What does Herbs Biotic specialize in?",
    answer:
      "Herbs Biotic specializes in manufacturing and supplying herbal extracts, nutraceutical ingredients, botanical powders, vitamins, minerals, probiotics, and specialty ingredients for the health and wellness industry.",
  },
  {
    id: "2",
    question: "Are your products tested for quality?",
    answer:
      "Yes, all products undergo strict quality control testing and are supplied with relevant documents such as COA, MSDS, and specification sheets.",
  },
  {
    id: "3",
    question: "Do you provide customized herbal extracts?",
    answer:
      "Yes, we offer customized extract ratios, active marker standardization, and product development solutions based on customer requirements.",
  },
  {
    id: "4",
    question: "What industries do you serve?",
    answer:
      "We serve nutraceutical, pharmaceutical, ayurvedic, food, beverage, cosmetic, and personal care industries.",
  },
  {
    id: "5",
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "MOQ depends on the product category. Please contact our sales team for specific MOQ requirements.",
  },
  {
    id: "6",
    question: "Do you provide export documentation?",
    answer:
      "Yes, we provide export-support documents such as COA, MSDS, Technical Data Sheets, and other required documentation depending on the destination country.",
  },
  {
    id: "7",
    question: "How can I request a product quotation?",
    answer:
      "You can send your requirement through our website, email, or contact form, and our team will provide a quotation promptly.",
  },
  {
    id: "8",
    question: "Are your ingredients suitable for dietary supplements?",
    answer:
      "Yes, many of our ingredients are widely used in dietary supplements, nutraceutical formulations, and wellness products.",
  },
  {
    id: "9",
    question: "Can you develop products according to customer specifications?",
    answer:
      "Yes, our technical team can assist in developing ingredients and formulations according to customer-specific requirements.",
  },
  {
    id: "10",
    question: "How do you ensure product consistency?",
    answer:
      "We follow standardized manufacturing processes, quality control procedures, and batch-wise testing to ensure consistent product quality.",
  },
];

const ITEMS_PER_PAGE = 3;

function QNA2() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const accordionRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(faqData.length / ITEMS_PER_PAGE);

  const currentFaqs = faqData.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
      .to({}, { duration: 1 })
      .to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
      });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (!accordionRef.current) return;

    gsap.fromTo(
      accordionRef.current.children,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }, [page]);

  return (
    <section
      className={`${manrope.className} bg-white w-full px-4 md:px-10 lg:px-20 py-16 pb-30 flex flex-col md:flex-row gap-10 items-center`}
    >
            {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">

        <div>
          <h2 className="text-teal-900 font-black text-3xl md:text-4xl leading-tight text-center md:text-left">
            Do you have Questions?
            <br />
            We have the answers!
          </h2>
        </div>

        {/* SVG */}
        <div className="flex justify-center md:justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 180 500.7 120"
            className="w-40 md:w-56 lg:w-64"
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

        <p className="max-w-md text-center md:text-left text-teal-900/70 text-lg">
          Everything you need to know about Herbs Biotic,
          our products and services.
        </p>

        {/* Pagination */}

        <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">

          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-900/15 transition hover:bg-[#E1E53F] disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`transition-all duration-300 rounded-full ${
                  page === i
                    ? "w-8 h-3 bg-[#E1E53F]"
                    : "w-3 h-3 bg-teal-900/20 hover:bg-teal-900/40"
                }`}
              />
            ))}

          </div>

          <button
            onClick={() =>
              setPage((p) => Math.min(totalPages - 1, p + 1))
            }
            disabled={page === totalPages - 1}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-900/15 transition hover:bg-[#E1E53F] disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>

        </div>

        <button className="group mt-6 relative flex w-fit items-center gap-4 overflow-hidden rounded-full bg-gray-100 px-8 py-4 font-semibold text-teal-900">

          <span className="absolute right-1 h-1 w-0 rounded-full bg-[#E1E53F] transition-all duration-500 group-hover:right-[-10%] group-hover:h-[120%] group-hover:w-[120%]" />

          <span className="relative z-10">
            Contact us
          </span>

          <span className="relative z-10 rounded-full bg-white p-2">
            <MoveRight size={18} />
          </span>

        </button>

      </div>

      {/* RIGHT SIDE */}

      <div
        ref={accordionRef}
        className="w-full md:w-1/2"
      >
        <Accordion
          type="single"
          collapsible
          className="space-y-4"
        >
          {currentFaqs.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-teal-900/10"
            >
              <AccordionTrigger
                className="
                  py-6
                  text-left
                  text-xl
                  font-semibold
                  text-teal-900
                  hover:no-underline
                  md:text-2xl
                  lg:text-3xl
                "
              >
                {item.question}
              </AccordionTrigger>

              <AccordionContent
                className="
                  pb-6
                  text-base
                  leading-relaxed
                  text-teal-900/70
                  md:text-lg
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