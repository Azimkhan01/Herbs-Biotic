"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import gsap from "gsap";

import { GiHamburgerMenu } from "react-icons/gi";
import { CiLocationArrow1, CiSearch } from "react-icons/ci";

import "./css/header.css";

import MobileSideNavbar from "./header_component/MobileSideNavbar";
import { manrope } from "@/font/font";

export default function Header() {
  const pathname = usePathname();

  const [isNavbar, setIsNavbar] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // -------------------------------
  // Refs
  // -------------------------------

  const leafRef = useRef<HTMLAnchorElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);

  const herbsRef = useRef<HTMLParagraphElement>(null);
  const bioticsRef = useRef<HTMLParagraphElement>(null);

  const timeline = useRef<gsap.core.Timeline | null>(null);

  // -------------------------------
  // Scroll
  // -------------------------------

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const next = window.scrollY > 50;

      setScrolled((prev) => {
        if (prev === next) return prev;
        return next;
      });

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(updateScroll);
    };

    updateScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // -------------------------------
  // Initial GSAP setup
  // -------------------------------

  useLayoutEffect(() => {
    if (
      !leafRef.current ||
      !textWrapperRef.current ||
      !herbsRef.current ||
      !bioticsRef.current
    )
      return;

    gsap.set(textWrapperRef.current, {
      visibility: "hidden",
    });

    gsap.set([herbsRef.current, bioticsRef.current], {
      y: 50,
      opacity: 0,
    });

    timeline.current = gsap.timeline({
      paused: true,
      defaults: {
        overwrite: "auto",
      },
    });

    timeline.current
      .to(leafRef.current, {
        scale: 0.4,
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      })
      .set(textWrapperRef.current, {
        visibility: "visible",
      })
      .to(
        [herbsRef.current, bioticsRef.current],
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.05",
      );

    return () => {
      timeline.current?.kill();
    };
  }, []);

  // -------------------------------
  // Play / Reverse
  // -------------------------------

  useEffect(() => {
    if (!timeline.current) return;

    if (scrolled) {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  }, [scrolled]);
  return (
    <>
      <header
        className={`
        ${manrope.className}
        fixed top-0 left-0 z-50 w-full
        transition-all duration-300
        px-6 py-6
        ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-black/10 text-teal-900"
            : pathname === "/"
              ? "bg-transparent text-white"
              : "bg-transparent text-teal-900"
        }
      `}
      >
        <nav
          className="flex items-center justify-between"
          aria-label="Primary Navigation"
        >
          {/* ---------------- Mobile ---------------- */}

          <div className="w-2/7 md:hidden">
            <button
              type="button"
              aria-label="Open Menu"
              title="Open Menu"
              onClick={() => setIsNavbar(true)}
            >
              <GiHamburgerMenu className="text-2xl" />
            </button>
          </div>

          {/* ---------------- Desktop Links ---------------- */}

          <div className="hidden w-2/7 md:flex items-center gap-5">
            <Link
              href="/product"
              className="animated-line text-sm uppercase tracking-wider"
            >
              Product
            </Link>

            <Link
              href="/contact"
              className="animated-line text-sm uppercase tracking-wider"
            >
              Contact
            </Link>

            <Link
              href="/certification"
              className="animated-line text-sm uppercase tracking-wider"
            >
              Certification
            </Link>
          </div>

          {/* ---------------- Logo ---------------- */}

          <div className="relative flex h-12 min-w-[280px] items-center justify-center">
            {/* Leaf Logo */}

            <Link
              href="/"
              ref={leafRef}
              aria-label="Home"
              className="absolute flex items-center justify-center"
            >
              <Image
                src={
                  pathname === "/"
                    ? "/logo/onlylogowhitebgr.png"
                    : "/logo/onlylogo.png"
                }
                alt="Herbs Biotics"
                width={100}
                height={100}
                priority
                className="select-none p-3"
              />
            </Link>

            {/* Animated Text */}

            <div ref={textWrapperRef} className="absolute overflow-hidden">
              <Link
                href="/"
                aria-label="Home"
                className="
                flex
                items-center
                gap-4
                uppercase
                font-extrabold
                tracking-wide
                text-2xl
                md:text-[30px]
                text-teal-900
                whitespace-nowrap
              "
              >
                <p ref={herbsRef}>Herbs</p>

                <p ref={bioticsRef}>Biotics</p>
              </Link>
            </div>
          </div>

          {/* ---------------- Right Side ---------------- */}

          <div className="flex w-2/7 items-center justify-end gap-6">
            <Link href="/search">
              <CiSearch className="text-2xl" />
            </Link>

            <Link
              href="/product"
              className="
              group
              hidden
              md:flex
              items-center
              gap-3
              rounded-full
              bg-[#E1E53F]
              px-4
              py-2
              text-sm
              uppercase
              text-teal-900
              transition-all
              duration-300
            "
            >
              Shop Online
              <span
                className="
                flex
                w-0
                rotate-180
                items-center
                justify-center
                overflow-hidden
                opacity-0
                transition-all
                duration-300
                group-hover:w-6
                group-hover:rotate-0
                group-hover:opacity-100
              "
              >
                <CiLocationArrow1 className="text-xl" />
              </span>
            </Link>
          </div>
        </nav>
      </header>

      <MobileSideNavbar isNavbar={isNavbar} setIsNavbar={setIsNavbar} />
    </>
  );
}
