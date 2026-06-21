import CurveDivider from "@/component/common/Wave";
import Hero from "@/component/product/Hero";
import Main from "@/component/product/Main";
import React from "react";

function page() {
  return (
    <section className="mt-22">
      <Hero />
      <CurveDivider color="#FFFFFF" className="bg-[#F3F4F6]" />
      <Main/>
    </section>
  );
}

export default page;
