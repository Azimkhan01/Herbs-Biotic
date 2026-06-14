"use client";

import { useCategory } from "@/context/CategoryToggleContext";

export default function CategoryToggle() {
  const {
    categories,
    activeCategory,
    setActiveCategory,
  } = useCategory();

  if (!categories.length) {
    return <div>Loading...</div>;
  }

  const activeIndex = categories.findIndex(
    (category) => category.category_id === activeCategory
  );

  return (
    <div className="flex justify-center">
      <div className="relative flex rounded-full bg-gray-100 p-1">
        <div
          className="absolute top-1 bottom-1 rounded-full bg-[#E1E53F] shadow-md transition-all duration-300"
          style={{
            width: `${100 / categories.length}%`,
            left: `${(100 / categories.length) * activeIndex}%`,
          }}
        />

        {categories.map((category) => (
          <button
            key={category.category_id}
            onClick={() =>
              setActiveCategory(category.category_id)
            }
            className={`
              relative z-10
              min-w-[60px]
              md:min-w-[120px]
              lg:min-w-[160px]
              px-3
              md:px-5
              lg:px-6
              py-2
              md:py-3
              rounded-full
              font-black
              text-xs
              md:text-sm
              lg:text-base
              ${
                activeCategory === category.category_id
                  ? "text-teal-900"
                  : "text-gray-500"
              }
            `}
          >
            <span className="md:hidden">
              {category.category_name.charAt(0)}
            </span>

            <span className="hidden md:inline lg:hidden">
              {category.category_name.split(" ")[0]}
            </span>

            <span className="hidden lg:inline">
              {category.category_name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}