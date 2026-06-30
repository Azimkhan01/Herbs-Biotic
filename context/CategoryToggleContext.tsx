"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Category {
  category_id: string;
  category_name: string;
}

interface CategoryContextType {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

const CategoryContext = createContext<CategoryContextType | null>(
  null
);

const STORAGE_KEY = "categories_cache";
const EXPIRY_DAYS = 7;

export function CategoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Check localStorage first
        const cached = localStorage.getItem(STORAGE_KEY);

        if (cached) {
          const parsed = JSON.parse(cached);

          const isExpired =
            Date.now() > parsed.expiresAt;

          if (!isExpired && parsed.data?.length) {
            setCategories(parsed.data);
            setActiveCategory(
              parsed.data[0].category_id
            );
            return;
          }

          localStorage.removeItem(STORAGE_KEY);
        }

        // Fetch if cache missing or expired
        const res = await fetch("/api/category");
        const data: Category[] = await res.json().data;

        setCategories(data);

        if (data.length > 0) {
          setActiveCategory(data[0].category_id);
        }

        // Save to localStorage
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            data,
            expiresAt:
              Date.now() +
              EXPIRY_DAYS *
                24 *
                60 *
                60 *
                1000,
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error(
      "useCategory must be used inside CategoryProvider"
    );
  }

  return context;
}