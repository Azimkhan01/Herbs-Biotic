import type { Metadata } from "next";
import ProductPage from "./ProductPage";

export const metadata: Metadata = {
  title: "Products | Herbs Biotics",

  description:
    "Browse Herbs Biotics' collection of premium herbal, Ayurvedic, and natural wellness products designed to support a healthier lifestyle.",

  keywords: [
    "Herbs Biotics",
    "Herbal Products",
    "Ayurvedic Medicine",
    "Natural Supplements",
    "Organic Wellness",
    "Health Products",
  ],

  alternates: {
    canonical: "/product",
  },

  openGraph: {
    title: "Products | Herbs Biotics",
    description:
      "Discover premium herbal and Ayurvedic healthcare products.",

    url: "https://yourdomain.com/product",

    siteName: "Herbs Biotics",

    type: "website",

    images: [
      {
        url: "/og-products.jpg",
        width: 1200,
        height: 630,
        alt: "Herbs Biotics Products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Products | Herbs Biotics",

    description:
      "Premium herbal and Ayurvedic products from Herbs Biotics.",

    images: ["/og-products.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <ProductPage />;
}