"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Asterisk, ChevronRight } from "lucide-react";
import { archivo_black } from "@/font/font";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const items = Array.from({ length: 3 });

interface HeroProps {
  title: string;
  current: {
    name: string;
    link: string;
  };
  children?: ReactNode;
}

export default function Hero({
  title,
  current,
  children,
}: HeroProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const width = marqueeRef.current!.scrollWidth / 2;

    gsap.to(marqueeRef.current, {
      x: -width,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % width),
      },
    });
  });

  return (
    <section className="relative overflow-hidden py-12 bg-[#F2F3F4]">
      {/* Marquee */}
      <div ref={marqueeRef} className="flex w-max">
        {[...items, ...items].map((_, i) => (
          <div
            key={i}
            className="mx-6 flex shrink-0 items-center whitespace-nowrap text-5xl md:text-8xl font-black uppercase tracking-wider text-teal-900"
          >
            <Asterisk size={82} className="text-[#E1E53F]" />
            <span className={archivo_black.className}>{title}</span>
            <Asterisk size={82} className="text-[#E1E53F]" />
          </div>
        ))}
      </div>

      <div className="my-30 flex gap-3 justify-center items-center">
        <Link href="/">Home</Link>
        <ChevronRight size={12} />
        <Link href={current.link}>{current.name}</Link>
      </div>

      {children}
    </section>
  );
}