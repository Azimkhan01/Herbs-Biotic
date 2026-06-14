"use client";

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
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article
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
      "
    >
      {/* Badges */}
      <div
        className="
          flex
          justify-center
          gap-3
          overflow-hidden

          opacity-100
          translate-y-0

          lg:opacity-0
          lg:-translate-y-3

          lg:group-hover:opacity-100
          lg:group-hover:translate-y-0

          transition-all
          duration-500
        "
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

      {/* Product Image */}
      <div className="flex flex-1 items-center justify-center py-10">
        <img
          src={product.product_images?.[0]?.url}
          alt={product.Extract_Name}
          className="
            max-h-[220px]
            rounded-2xl
            object-contain
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* Product Name */}
      <div>
        <h3 className="font-black text-teal-900">
          {product.Extract_Name}
        </h3>
      </div>

      {/* CTA */}
      <Link
        href={`/product/${product.id}`}
        className="
          mt-6
          flex
          items-center
          justify-between
          rounded-2xl
          bg-white
          px-2
          py-1

          opacity-100
          translate-y-0

          lg:opacity-0
          lg:translate-y-4

          lg:group-hover:opacity-100
          lg:group-hover:translate-y-0

          transition-all
          duration-500

          hover:bg-[#E1E53F]
        "
      >
        <span className="font-semibold text-teal-900">
          Place your order
        </span>

        <span
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#E1E53F]
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        >
          <ArrowRight size={18} className="text-teal-900" />
        </span>
      </Link>
    </article>
  );
}