"use client";

import { useEffect, useState } from "react";
import ProductCard from "../common/ProductCard";
import ProductCardSkeleton from "./ProductSkeleton";

interface ProductImage {
  id: string;
  url: string;
}

interface Product {
  id: string;
  Extract_Name: string;
  Unit_in_Order?: string;
  Active_Compound?: string;
  Botanical_Name?: string;
  product_images: ProductImage[];
}

interface SimilarProductsProps {
  productId: string;
}

export default function SimilarProducts({
  productId,
}: SimilarProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheKey = `similar_products_${productId}`;
    const cacheTimeKey = `similar_products_time_${productId}`;

    const fetchSimilarProducts = async () => {
      try {
        const cachedProducts =
          sessionStorage.getItem(cacheKey);

        const cachedTime =
          sessionStorage.getItem(cacheTimeKey);

        const oneDay = 24 * 60 * 60 * 1000;

        if (
          cachedProducts &&
          cachedTime &&
          Date.now() - Number(cachedTime) < oneDay
        ) {
          setProducts(
            JSON.parse(cachedProducts)
          );

          setLoading(false);
          return;
        }

        const response = await fetch(
          `/api/product/similar?id=${productId}`
        );

        const data = await response.json();

        if (data.success) {
          setProducts(data.products || []);

          sessionStorage.setItem(
            cacheKey,
            JSON.stringify(data.products || [])
          );

          sessionStorage.setItem(
            cacheTimeKey,
            Date.now().toString()
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch similar products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [productId]);

  if (loading) {
    return (
      <section className="mt-16 md:mt-24">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[4px] text-orange-500">
            Related Products
          </p>

          <h2 className="mt-3 text-3xl font-bold text-teal-900 md:text-4xl lg:text-5xl">
            Similar Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-500 md:text-base">
            Loading similar products...
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            mb-10
          "
        >
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <ProductCardSkeleton
                key={index}
              />
            )
          )}
        </div>
      </section>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <section className="mt-16 mb-10 md:mt-24">
      <div className="mb-12 text-center">
        <p className="text-sm font-medium uppercase tracking-[4px] text-orange-500">
          Related Products
        </p>

        <h2 className="mt-3 text-3xl font-bold text-teal-900 md:text-4xl lg:text-5xl">
          Similar Products
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-500 md:text-base">
          Discover more products from the same category.
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}