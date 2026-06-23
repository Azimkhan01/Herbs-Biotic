"use client";

import ProductCard from "../common/ProductCard";
import { useProducts } from "@/context/ProductContext";
import ProductPagination from "./Pagination";
import ProductCardSkeleton from "./ProductSkeleton";
import { RefObject } from "react";

interface ProductSectionProps {
  productRef: RefObject<HTMLElement | null>;
}
function ProductSection({ productRef }: ProductSectionProps) {
  const { products, loading, pagination } = useProducts();

  if (loading) {
    return (
      <section id="product_section" className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={productRef} className="py-20 bg-white">
      <div className="container mx-auto">
        {products.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-lg text-gray-500">No products found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-12">
                <ProductPagination />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default ProductSection;
