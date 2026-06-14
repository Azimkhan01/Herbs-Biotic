"use client";

import { useEffect, useState } from "react";
import { useCategory } from "@/context/CategoryToggleContext";
import ProductCard from "../common/ProductCard";

interface ProductImage {
  id: string;
  url: string;
}

interface Product {
  id: string;
  Extract_Name: string;
  Botanical_Name?: string;
  Primary_Benefit?: string;
  product_images: ProductImage[];
}

interface Recommendation {
  id: string;
  productId: string;
  products: Product;
}

export default function CategoryWiseRecommendation() {
  const { activeCategory } = useCategory();

  const [products, setProducts] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeCategory) return;

    const fetchProducts = async () => {
      const storageKey = `recommendations_${activeCategory}`;

      try {
        setLoading(true);

        // Check sessionStorage first
        const cached = sessionStorage.getItem(storageKey);

        if (cached) {
          setProducts(JSON.parse(cached));
          return;
        }

        // Fetch from API
        const res = await fetch(
          `/api/recommendation?category=${activeCategory}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data: Recommendation[] = await res.json();

        setProducts(data);

        // Save to sessionStorage
        sessionStorage.setItem(
          storageKey,
          JSON.stringify(data)
        );
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="aspect-[3/4] animate-pulse rounded-3xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard
              key={item.products.id}
              product={item.products}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-500">
          No recommended products found.
        </div>
      )}
    </div>
  );
}