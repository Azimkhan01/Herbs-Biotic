"use client";

import dynamic from "next/dynamic";

const PdfBook = dynamic(() => import("./PdfBook"), {
  ssr: false,
  loading: () => null,
});

export default function Booklet() {
  return <PdfBook />;
}