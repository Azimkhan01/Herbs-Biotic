"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductImage {
  id: string;
  url: string;
}

interface Product {
  id: string;
  Extract_Name: string;
  Unit_in_Order?: string;
  product_images: ProductImage[];
  Active_Compound?: string;
  Botanical_Name?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsActive(false), 500);
      }}
      className="
        group
        flex
        flex-col
        rounded-[32px]
        bg-[#F2F3F4]
        p-6
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-xl
        active:scale-[0.98]
      "
    >
      {/* BADGES */}
      <div
        className={`
          flex
          justify-center
          gap-3
          overflow-hidden
          transition-all
          duration-500
          
          ${
            isActive
              ? "opacity-100 translate-y-0"
              : "lg:opacity-0 lg:-translate-y-3"
          }
        `}
      >
        {product.Unit_in_Order && (
          <p
            className="
              rounded-full
              bg-[#E7E7E9]
              px-4
              py-2
              text-sm
              whitespace-nowrap
              transition-colors
              duration-300
              hover:bg-[#E1E53F]
            "
          >
            {product.Unit_in_Order}
          </p>
        )}

        {product.Active_Compound && (
          <p
            className="
              rounded-full
              bg-[#E7E7E9]
              px-4
              py-2
              text-xs
              max-w-[180px]
              truncate
              transition-colors
              duration-300
              hover:bg-[#E1E53F]
            "
            title={product.Active_Compound}
          >
            {product.Active_Compound}
          </p>
        )}
      </div>

      {/* PRODUCT IMAGE */}
      <div className="flex flex-1 items-center justify-center py-10">
        <img
          src={product.product_images?.[0]?.url}
          alt={product.Extract_Name}
          className={`
            max-h-[220px]
            rounded-2xl
            object-contain
            transition-all
            duration-500
            
            ${
              isActive
                ? "scale-105"
                : "scale-100"
            }
          `}
        />
      </div>

      {/* PRODUCT INFO */}
      <div>
        <h3 className="truncate text-lg font-black text-teal-900">
          {product.Botanical_Name}
        </h3>

        <p className="text-sm text-orange-500">
          {product.Extract_Name}
        </p>
      </div>

      {/* CTA */}
      <Link
        href={`/product/${product.id}`}
        className={`
          mt-6
          flex
          items-center
          justify-between
          rounded-2xl
          bg-white
          px-3
          py-2
          transition-all
          duration-500

          ${
            isActive
              ? "opacity-100 translate-y-0"
              : "lg:opacity-0 lg:translate-y-4"
          }

          hover:bg-[#E1E53F]
        `}
      >
        <span className="font-semibold text-teal-900">
          Place your order
        </span>

        <span
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#E1E53F]
            transition-all
            duration-300

            ${
              isActive
                ? "translate-x-1 rotate-0"
                : "translate-x-0"
            }
          `}
        >
          <ArrowRight
            size={18}
            className="text-teal-900"
          />
        </span>
      </Link>
    </article>
  );
}