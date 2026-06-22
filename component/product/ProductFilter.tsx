"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

export default function ProductFilter() {
  const {
    categories,
    category,
    setCategory,
    setPage,
  } = useProducts();

  const [open, setOpen] = useState(false);

  const handleCategory = (value: string) => {
    setCategory(value);
    setPage(1);
    setOpen(false);
  };

  return (
    <>
      {/* Floating Filter Button */}
      <button
      title="t"
        onClick={() => setOpen(true)}
        className="
          fixed
          top-1/2
          left-6
          -translate-y-1/2
          z-50
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#E1E53F]
          shadow-xl
          transition
          hover:scale-105
        "
      >
        <Filter className="h-6 w-6 text-teal-900" />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/40 transition-opacity duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-80
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">
            Categories
          </h2>

          <button title="cross" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-2 p-6 overflow-y-auto">
          <button
            onClick={() => handleCategory("")}
            className={`w-full rounded-xl px-4 py-3 text-left transition
              ${
                category === ""
                  ? "bg-[#E1E53F] font-semibold"
                  : "hover:bg-gray-100"
              }`}
          >
            All Products
          </button>

          {categories.map((item) => (
            <button
              key={item.category_id}
              onClick={() => handleCategory(item.category_id)}
              className={`w-full rounded-xl px-4 py-3 text-left transition
                ${
                  category === item.category_id
                    ? "bg-[#E1E53F] font-semibold"
                    : "hover:bg-gray-100"
                }`}
            >
              {item.category_name}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}