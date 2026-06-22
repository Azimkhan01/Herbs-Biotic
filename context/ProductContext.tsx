"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProductImage {
  id: string;
  url: string;
}

export interface Product {
  id: string;
  Extract_Name: string;
  Botanical_Name?: string;
  Unit_in_Order?: string;
  Active_Compound?: string;
  product_images: ProductImage[];
}

export interface Category {
  category_id: string;
  category_name: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ProductContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;

  page: number;
  setPage: (page: number) => void;

  category: string;
  setCategory: (category: string) => void;

  pagination: Pagination | null;
}

const ProductContext = createContext<ProductContextType | null>(null);

const CACHE_TIME = 1000 * 60 * 30; // 30 minutes

function setCache(key: string, value: unknown) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    key,
    JSON.stringify({
      value,
      expiry: Date.now() + CACHE_TIME,
    })
  );
}

function getCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  const item = localStorage.getItem(key);

  if (!item) return null;

  try {
    const parsed = JSON.parse(item);

    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return parsed.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export function ProductProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  const [pagination, setPagination] =
    useState<Pagination | null>(null);

  // ---------------------------
  // Fetch Products
  // ---------------------------

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const cacheKey = `products-${page}-${category || "all"}`;

        const cached = getCache<{
          products: Product[];
          pagination: Pagination;
        }>(cacheKey);

        if (cached) {
          setProducts(cached.products);
          setPagination(cached.pagination);
          setLoading(false);
          return;
        }

        let url = `/api/product?page=${page}&limit=10`;

        if (category) {
          url += `&category=${category}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        setProducts(data.products);
        setPagination(data.pagination);

        setCache(cacheKey, {
          products: data.products,
          pagination: data.pagination,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, category]);

  // ---------------------------
  // Fetch Categories
  // ---------------------------

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cached = getCache<Category[]>("categories");

        if (cached) {
          setCategories(cached);
          return;
        }

        const res = await fetch("/api/category");

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        setCategories(data);

        setCache("categories", data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        page,
        setPage,
        category,
        setCategory,
        pagination,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductProvider"
    );
  }

  return context;
}