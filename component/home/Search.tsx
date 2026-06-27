"use client";

import { manrope } from "@/font/font";
import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  category_name: string;
}

function Search() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();

        // If your API returns an array directly
        setCategories(data);

        // If your API returns { categories: [...] }
        // setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = () => {
    console.log({
      search,
      category: selectedCategory,
    });

    // Perform your search here
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6">
      <div>
        <p
          className={`text-teal-900 text-2xl text-center md:text-4xl ${manrope.className} font-semibold`}
        >
          Find the{" "}
          <span className="font-extrabold underline underline-offset-4 decoration-[#E1E53F]">
            ideal Product
          </span>{" "}
          for your Business!
        </p>
      </div>

      {/* Search */}
      <div className="mt-10 flex flex-col md:flex-row gap-4 w-full max-w-4xl">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-700"
        />

        {/* Category Select */}
        <div className="relative min-w-[260px]">
          <label
            htmlFor="category"
            className="absolute top-1 right-2 bg-white px-2 text-sm font-semibold text-teal-900"
          >
            Category
          </label>

          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="
      w-full
      rounded-2xl
      border-2
      border-teal-900/20
      bg-white
      px-5
      py-4
      text-teal-900
      font-medium
      shadow-md
      outline-none
      transition-all
      duration-300
      cursor-pointer
      hover:border-[#E1E53F]
      hover:shadow-lg
      focus:border-[#E1E53F]
      focus:ring-4
      focus:ring-[#E1E53F]/30
    "
          >
            <option value="">🌿 All Categories</option>

            {categories.map((category) => (
              <option key={category.id} value={category.category_name}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="rounded-full tracking-wider bg-[#E1E53F] px-8 py-3 font-semibold text-teal-900 "
        >
          Search
        </button>
      </div>
    </section>
  );
}

export default Search;
