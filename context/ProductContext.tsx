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

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  const [pagination, setPagination] = useState<Pagination | null>(null);

  // ---------------------------
  // PRODUCTS
  // ---------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let url = `/api/product?page=${page}&limit=10`;

        if (category) {
          url += `&category=${category}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setProducts(data?.products ?? []);
        setPagination(data?.pagination ?? null);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, category]);

  // ---------------------------
  // CATEGORIES (FIXED SAFE PARSING)
  // ---------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();

        const safeCategories = Array.isArray(data?.data)
          ? data.data
          : [];

        setCategories(safeCategories);
      } catch (err) {
        console.error(err);
        setCategories([]);
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
    throw new Error("useProducts must be used inside ProductProvider");
  }

  return context;
}