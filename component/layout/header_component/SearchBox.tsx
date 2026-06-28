"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import ProductCard from "@/component/common/ProductCard";
import useDebounce from "@/lib/useDebounce";

interface ProductImage {
  id: string;
  url: string;
}

interface Product {
  id: string;
  Extract_Name: string;
  Botanical_Name?: string;
  Active_Compound?: string;
  Unit_in_Order?: string;
  product_images: ProductImage[];
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchBox({
  open,
  onClose,
}: Props) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Autofocus
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC key
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [onClose]);

  // Click outside
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", click);

    return () => {
      document.removeEventListener("mousedown", click);
    };
  }, [onClose]);

  // Search
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setProducts([]);
      return;
    }

    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    const search = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();

        setProducts(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    search();

    return () => controller.abort();
  }, [debouncedQuery]);
    return (
    <div
      className={`fixed inset-0 z-[9999] flex items-start justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ${
        open
          ? "visible opacity-100"
          : "invisible opacity-0"
      }`}
    >
      <div
        ref={wrapperRef}
        className="
          mt-6
          flex
          h-[90vh]
          w-[95%]
          max-w-7xl
          flex-col
          overflow-hidden
          rounded-3xl
          bg-[#F4F1EB]
          shadow-2xl
        "
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 border-b bg-[#F4F1EB] p-6">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search extract, botanical name, active compound..."
              className="
                h-14
                w-full
                rounded-full
                border
                border-gray-300
                bg-white
                pl-14
                pr-14
                text-lg
                outline-none
                transition
                focus:border-lime-500
                focus:ring-2
                focus:ring-lime-400
              "
            />

            {query && (
              <button
              title="q"
                onClick={() => {
                  setQuery("");
                  setProducts([]);
                  inputRef.current?.focus();
                }}
                className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <X size={18} />
              </button>
            )}

            <button
            title="t"
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex h-60 items-center justify-center">
              <Loader2
                size={40}
                className="animate-spin text-lime-600"
              />
            </div>
          )}

          {!loading && query.length < 2 && (
            <div className="flex h-60 items-center justify-center text-lg text-gray-500">
              Start typing to search products...
            </div>
          )}

          {!loading &&
            query.length >= 2 &&
            products.length === 0 && (
              <div className="flex h-60 items-center justify-center text-lg text-gray-500">
                No products found.
              </div>
            )}

          {!loading && products.length > 0 && (
            <>
              <p className="mb-6 text-sm text-gray-500">
                {products.length} product
                {products.length > 1 ? "s" : ""} found
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}