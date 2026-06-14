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

const CategoryContext = createContext<CategoryContextType | null>(null);

export function CategoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data: Category[] = await res.json();

        setCategories(data);

        if (data.length > 0) {
          setActiveCategory(data[0].category_id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
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