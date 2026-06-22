"use client";

import { useRef } from "react";

import CurveDivider from "@/component/common/Wave";
import Hero from "@/component/product/Hero";
import Main from "@/component/product/Main";
import ProductFilter from "@/component/product/ProductFilter";
import ProductSection from "@/component/product/ProductSection";
import { ProductProvider } from "@/context/ProductContext";

export default function Page() {
  const productRef = useRef<HTMLElement>(null);

  return (
    <section className="mt-22">
      <Hero />
      <CurveDivider color="#FFFFFF" className="bg-[#F3F4F6]" />

      <ProductProvider>
        <Main productRef={productRef} />

        <section className="relative">
          <ProductFilter />
          <ProductSection productRef={productRef} />
        </section>
      </ProductProvider>
    </section>
  );
}
