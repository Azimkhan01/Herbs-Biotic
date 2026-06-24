"use client";

import { useRef } from "react";

import CurveDivider from "@/component/common/Wave";
import Main from "@/component/product/Main";
import ProductFilter from "@/component/product/ProductFilter";
import ProductSection from "@/component/product/ProductSection";
import { ProductProvider } from "@/context/ProductContext";
import Hero from "@/component/common/Hero";

export default function Page() {
  const productRef = useRef<HTMLElement>(null);

  return (
    <section className="mt-22">
      <Hero title="Products" current={{name:"Product",link:"/product"}} />
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
