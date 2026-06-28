"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { manrope } from "@/font/font";
import Booklet from "./header_component/Booklet";

interface Category {
  category_id: string;
  category_name: string;
}

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedCategories = localStorage.getItem("footer_categories");
        const storedTime = localStorage.getItem("footer_categories_timestamp");

        const oneDay = 24 * 60 * 60 * 1000;

        if (
          storedCategories &&
          storedTime &&
          Date.now() - Number(storedTime) < oneDay
        ) {
          setCategories(JSON.parse(storedCategories));
          return;
        }

        const response = await fetch("/api/category");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        const categoryList = data.categories || data.data || data || [];

        setCategories(categoryList);

        localStorage.setItem("footer_categories", JSON.stringify(categoryList));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section>
      {/* ================= HERO SECTION ================= */}

      {/* ================= HERO SECTION ================= */}

      <section
        className={`relative h-[450px] md:h-[600px] overflow-hidden ${manrope.className}`}
      >
        <img
          src="https://images.pexels.com/photos/15625745/pexels-photo-15625745.jpeg"
          alt="Banner"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Green Fade From Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#184D4A] via-[#184D4A]/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 -translate-y-10 md:-translate-y-14">
          <span className="uppercase tracking-[4px] text-white/80 text-sm mb-4">
            Premium Collection
          </span>

          <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-tight">
            Your Main Title
          </h2>

          <p className="text-white/90 mt-6 max-w-2xl text-base md:text-lg">
            Replace this text with your own content. This area looks much better
            when the text sits slightly higher than the vertical center.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="bg-[#184D4A] text-white ">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Contact */}

            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>

              <p className="text-white/80 leading-8">
                <span className="font-semibold">Billing Address:</span>
                <br />
                D-77 Sector-63 Noida,
                <br />
                Gautam Buddha Nagar,
                <br />
                Uttar Pradesh 201301
              </p>

              <p className="text-white/80 leading-8">
                <span className="font-semibold">Shipping Address:</span>
                <br />
                Plot No: 90, Block B,
                <br />
                Sector 67, Noida,
                <br />
                Uttar Pradesh 201301
              </p>

              <p className="mt-5 text-white/80">
                Phone:{" "}
                <a href="tel:+918860777110" className="hover:underline">
                  +91 8860777110
                </a>{" "}
                /{" "}
                <a href="tel:+918860777130" className="hover:underline">
                  8860777130
                </a>
              </p>

              <p className="text-white/80">
                Email:{" "}
                <a href="mailto:info.herbsbiotic@gmail.com" className="hover:underline">
                  info.herbsbiotic@gmail.com
                </a>
              </p>

              <div className="flex justify-center lg:justify-start gap-4 mt-8">
                <Link
                  href="#"
                  className="w-12 h-12 rounded-full bg-lime-300 text-black flex items-center justify-center hover:scale-105 transition"
                >
                  <FaFacebookF />
                </Link>

                <Link
                  href="#"
                  className="w-12 h-12 rounded-full bg-lime-300 text-black flex items-center justify-center hover:scale-105 transition"
                >
                  <FaInstagram />
                </Link>
              </div>
            </div>

            {/* Categories */}

            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-6">Categories</h3>

              <ul className="space-y-3 text-white/80">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.category_id}>
                      <Link
                        href={`/category/${encodeURIComponent(
                          category.category_name,
                        )}`}
                        className="hover:text-white transition"
                      >
                        {category.category_name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No Categories Found</li>
                )}
              </ul>
            </div>

            {/* Customer Service */}

            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-6">Customer Service</h3>

              <ul className="space-y-3 text-white/80">
                <li>
                  <Link href="/contact">Contact</Link>
                </li>

                <li>
                  <Link href="/faq">FAQ</Link>
                </li>

                <li>
                  <Link href="/returns">Returns Policy</Link>
                </li>

                <li>
                  <Link href="/shipping">Shipping Information</Link>
                </li>

                <li>
                  <Link href="/login">Login</Link>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}

            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-6">Opening Hours</h3>

              <div className="space-y-5 text-white/80">
                <div>
                  <p className="font-medium">Monday - Saturday</p>

                  <p>09:00 AM - 06:00 PM</p>
                </div>

                <div>
                  <p className="font-medium">Sunday</p>

                  <p>Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}

          <div className="border-t border-white/20 mt-14 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <p className="text-white/70 text-sm">
                © {new Date().getFullYear()} All Rights Reserved.
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
                <Link href="/privacy-policy">Privacy Policy</Link>

                <Link href="/cookies-policy">Cookies Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Booklet/>
    </section>
  );
}
