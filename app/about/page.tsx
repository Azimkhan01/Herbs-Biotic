import Hero from "@/component/common/Hero";
import CurveDivider from "@/component/common/Wave";
import { manrope } from "@/font/font";
import Link from "next/link";
import type { Metadata } from "next";

// =======================================================
// 📌 ABOUT PAGE SEO
// Customize these values for your business.
// =======================================================

export const metadata: Metadata = {
  // Browser title & Google title
  title: "About Us | Herbs Biotics",

  // Meta Description (150–160 characters recommended)
  description:
    "Learn about Herbs Biotics, a trusted Indian manufacturer and supplier of herbal extracts, nutraceutical ingredients, vitamins, spray-dried powders, and natural healthcare solutions.",

  // Keywords
  keywords: [
    "About Herbs Biotics",
    "Herbal Ingredients",
    "Ayurvedic Ingredients",
    "Nutraceutical Manufacturer",
    "Herbal Extract Manufacturer",
    "Spray Dried Powder",
    "Vitamin Supplier",
    "ISO Certified Company",
    "GMP Certified",
    "Indian Herbal Company",
  ],

  // Canonical URL
  alternates: {
    canonical: "/about",
  },

  // Search Engine Rules
  robots: {
    index: true,
    follow: true,
  },

  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "About Herbs Biotics",

    description:
      "Discover Herbs Biotics, an ISO & GMP certified manufacturer specializing in herbal extracts, nutraceutical ingredients, vitamins, and natural wellness products.",

    url: "https://yourdomain.com/about", // Replace

    siteName: "Herbs Biotics",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-about.jpg", // Add to public/
        width: 1200,
        height: 630,
        alt: "About Herbs Biotics",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",

    title: "About Herbs Biotics",

    description:
      "Learn more about Herbs Biotics and our commitment to quality herbal and nutraceutical ingredients.",

    images: ["/og-about.jpg"],
  },
};
function page() {
  return (
    <section className="min-h-screen pt-22">
      <Hero title="About US" current={{ name: "About", link: "/about" }}>
        <div className="w-full flex justify-center items-center gap-6 flex-col">
          <p
            className={`${manrope.className} text-center text-5xl font-extrabold  text-teal-900 uppercase`}
          >
            Meet Herbs Bitoics
          </p>
          <p
            className={`text-center text-teal-900 ${manrope.className} font-semibold w-full md:w-5/6 p-4`}
          >
            Herbs Biotic is an Indian company delivering high-quality active
            ingredients, including Herbal Extracts, Spray-Dried Powders,
            Vitamins, and Nutraceutical Ingredients. We serve the Personal Care,
            Food, Pharmaceutical, and Nutraceutical industries with reliable
            supply, ready stock, and customized solutions.
          </p>
        </div>
      </Hero>
      <CurveDivider color="#FFFFFF" className="bg-[#F3F4F6]" />
      <div className="h-screen bg-white">
        <div>
          <p
            className={`${manrope.className} text-center text-6xl font-extrabold  text-teal-900 uppercase`}
          >
            Our Company
          </p>
        </div>
        <div className="p-10 md:p-20 w-full flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              className={`w-4/6 object-cover rounded-2xl`}
              src={"/about/location.jpeg"}
              alt="Office"
            />
          </div>
          <div className="w-1/2">
            <p
              className={`text-xl font-semibold text-teal-900 ${manrope.className} leading-10`}
            >
              As a trusted Manufacturer, Trader, and Retailer, Herbs Biotic is
              an ISO 9001:2015, ISO 22000:2018, and GMP Certified company,
              committed to the highest standards of quality, food safety, and
              manufacturing excellence. Quality assurance and on-time delivery
              are the foundation of our business, ensuring reliable products and
              complete customer satisfaction
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white flex justify-center items-center flex-col gap-10 py-20">
        <p
          className={`${manrope.className} text-teal-900 text-4xl font-semibold `}
        >
          In <span className="font-black">Herbs Biotics</span> we are everything
          next to in you and the pet your!
        </p>
        <Link
          className={`${manrope.className} text-teal-900 bg-[#e1e53f] p-4 rounded-full font-semibold`}
          href={"/product"}
        >
          See Our Product
        </Link>
      </div>
    </section>
  );
}

export default page;
