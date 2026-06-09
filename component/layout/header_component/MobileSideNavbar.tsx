"use client";

import { Category } from "@/type/type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

interface Props {
  isNavbar: boolean;
  setIsNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileSideNavbar({ isNavbar, setIsNavbar }:Props) {
  const [openIndex, setOpenIndex] = useState<0 | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("/api/category");

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-50 md:hidden
        transition-all duration-300
        ${isNavbar ? "pointer-events-auto" : "pointer-events-none"}
      `}
    >
      {/* Overlay */}
      <div
        className={`
          absolute inset-0 bg-black/30
          transition-opacity duration-300
          ${isNavbar ? "opacity-100" : "opacity-0"}
        `}
        onClick={() => setIsNavbar(false)}
      />

      {/* Sidebar */}
      <div
        className={`
          absolute top-0 left-0 h-full w-4/6
          bg-gray-100 text-teal-900 p-6
          transition-transform duration-300 ease-out
          ${isNavbar ? "translate-x-0 delay-150" : "-translate-x-full"}
        `}
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button title="Close" onClick={() => setIsNavbar(false)}>
            <RxCross1 className="text-3xl" />
          </button>
        </div>

        {/* Menu */}
        <div className="mt-8 flex flex-col">
          {/* Home */}
          <div className="border-b border-black/10 py-3">
            <Link
              href="/"
              className="block text-lg font-medium uppercase"
              onClick={() => setIsNavbar(false)}
            >
              Home
            </Link>
          </div>

          {/* Product Accordion */}
          <div className="border-b border-black/10 py-3">
            <button
              onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
              className="w-full flex items-center justify-between text-lg font-medium uppercase"
            >
              <span>Product</span>

              <IoChevronDown
                className={`
                  text-xl transition-transform duration-300
                  ${openIndex === 0 ? "rotate-180" : ""}
                `}
              />
            </button>

            <div
              className={`
                overflow-hidden transition-all duration-300
                ${openIndex === 0 ? "max-h-96 mt-3" : "max-h-0"}
              `}
            >
              <div className="ml-4 flex flex-col gap-3">
                {loading ? (
                  <div className="flex flex-col gap-3">
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="h-4 w-full rounded bg-gray-300 animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  categories.map((category:Category) => (
                    <Link
                      key={category.category_id}
                      href={`/product/${category.category_id}`}
                      className="
                        text-sm
                        uppercase
                        text-teal-900/80
                        hover:text-teal-900
                        transition-colors
                      "
                      onClick={() => setIsNavbar(false)}
                    >
                      {category.category_name}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="border-b border-black/10 py-3">
            <Link
              href="/contact"
              className="block text-lg font-medium uppercase"
              onClick={() => setIsNavbar(false)}
            >
              Contact
            </Link>
          </div>

          {/* Certification */}
          <div className="border-b border-black/10 py-3">
            <Link
              href="/certification"
              className="block text-lg font-medium uppercase"
              onClick={() => setIsNavbar(false)}
            >
              Certification
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileSideNavbar;
