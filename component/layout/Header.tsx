"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { CiLocationArrow1, CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./css/header.css";
import MobileSideNavbar from "./header_component/MobileSideNavbar";
import { manrope } from "@/font/font";
gsap.registerPlugin(useGSAP);

import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  const leafRef = useRef(null);
  const textWrapperRef = useRef(null);
  const herbsRef = useRef(null);
  const bioticsRef = useRef(null);
  const [isNavbar, setIsNavbar] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useGSAP(
    () => {
      if (scrolled) {
        const tl = gsap.timeline();

        tl.to(leafRef.current, {
          scale: 0.4,
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });

        tl.set(textWrapperRef.current, {
          visibility: "visible",
        });

        tl.fromTo(
          [herbsRef.current, bioticsRef.current],
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.1",
        );
      } else {
        const tl = gsap.timeline();

        tl.to([herbsRef.current, bioticsRef.current], {
          y: -30,
          opacity: 0,
          duration: 0.25,
          stagger: 0.04,
          ease: "power2.in",
        });

        tl.set(textWrapperRef.current, {
          visibility: "hidden",
        });

        tl.to(
          leafRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
          },
          "-=0.05",
        );
      }
    },
    { dependencies: [scrolled] },
  );

  return (
    <>
      <header
        className={`
    ${manrope.className}
    fixed top-0 z-50 w-full p-6 transition-all duration-300
    ${
      scrolled
        ? "backdrop-blur-xl bg-white/70 border-b border-black/10 text-teal-900"
        : pathname === "/"
          ? "bg-transparent text-white"
          : "bg-transparent text-teal-900"
    }
  `}
      >
        <nav className="flex items-center justify-between ">
          {/* Mobile */}
          <div className="w-2/7 md:hidden">
            <button onClick={() => setIsNavbar(true)} title="hamburger">
              <GiHamburgerMenu className="text-2xl" />
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:gap-3 w-2/7">
            <Link
              className="animated-line tracking-wider uppercase text-sm"
              href="/product"
            >
              Product
            </Link>

            <Link
              className="animated-line tracking-wider uppercase text-sm"
              href="/contact"
            >
              Contact
            </Link>

            <Link
              className="animated-line tracking-wider uppercase text-sm"
              href="/certification"
            >
              Certification
            </Link>
          </div>

          {/* Logo Area */}
          <div className="relative flex items-center justify-center min-w-[280px] h-12">
            {/* Leaf */}
            <div
              ref={leafRef}
              className="absolute flex items-center justify-center"
            >
              <FaLeaf className="text-4xl" />
            </div>

            {/* Hidden text reveal area */}
            <div
              className="absolute overflow-hidden"
              ref={textWrapperRef}
              style={{ visibility: "hidden" }}
            >
              <div
                className="
                flex items-center gap-4
                text-teal-900
                font-extrabold
                tracking-wide
                text-2xl
                md:text-[30px]
                
                uppercase
              "
              >
                <p ref={herbsRef}>Herbs</p>
                <p ref={bioticsRef}>Biotics</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-end gap-6 w-2/7">
            <button type="button" aria-label="Search" title="Search">
              <CiSearch className="text-2xl" />
            </button>

            <button className="hidden text-teal-900 group bg-[#E1E53F] uppercase md:flex items-center justify-center gap-3 px-4 py-2 rounded-full text-sm transition-all duration-500">
              shop online
              <span
                className="
                overflow-hidden
                w-0
                opacity-0
                rotate-180
                transition-all
                duration-500
                group-hover:w-6
                group-hover:opacity-100
                group-hover:rotate-0
                flex
                items-center
                justify-center
              "
              >
                <CiLocationArrow1 className="text-xl" />
              </span>
            </button>
          </div>
        </nav>
      </header>
      {/* MOBILE SIDE NAVBAR */}
      <MobileSideNavbar isNavbar={isNavbar} setIsNavbar={setIsNavbar} />
    </>
  );
}
