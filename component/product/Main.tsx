"use client";

import { manrope } from "@/font/font";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

interface Category {
  category_id: string;
  category_name: string;
}

export default function Main() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <main className={`${manrope.className} bg-white min-h-screen py-20`}>
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="text-center text-4xl md:text-5xl font-semibold tracking-wide text-teal-900">
          All our <span className="font-black">Products</span> in one place!
        </h1>

        <p className="mt-4 text-center text-teal-900/60">
          Browse all product categories.
        </p>

        {loading ? (
          <div className="mt-16 text-center text-lg text-teal-900">
            Loading...
          </div>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.category_id}
                href={`/products/${category.category_id}`}
                className="group rounded-3xl border border-teal-900/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#E1E53F] hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-teal-900">
                    {category.category_name}
                  </h2>

                  <div className="rounded-full bg-[#E1E53F] p-2 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={18} className="text-teal-900" />
                  </div>
                </div>

                <p className="mt-4 text-sm text-teal-900/60">
                  View all products in this category.
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}