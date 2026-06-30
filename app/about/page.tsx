import Hero from "@/component/common/Hero";
import CurveDivider from "@/component/common/Wave";
import { manrope } from "@/font/font";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
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

function Page() {
  return (
    <section className="min-h-screen pt-20 bg-gray-100">
      {/* Hero */}
      <Hero title="About Us" current={{ name: "About", link: "/about" }}>
        <div className="flex flex-col items-center justify-center gap-6 px-5 py-12">
          <h1
            className={`${manrope.className} text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-teal-900`}
          >
            Meet Herbs Biotics
          </h1>

          <p
            className={`${manrope.className} max-w-5xl text-center text-base sm:text-lg md:text-xl font-medium text-teal-900 leading-8`}
          >
            Herbs Biotic is an Indian company delivering high-quality active
            ingredients, including Herbal Extracts, Spray-Dried Powders,
            Vitamins, and Nutraceutical Ingredients. We serve the Personal
            Care, Food, Pharmaceutical, and Nutraceutical industries with
            reliable supply, ready stock, and customized solutions.
          </p>
        </div>
      </Hero>

      <CurveDivider color="#FFFFFF" className="bg-gray-100" />

      {/* Company Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-10">
          <h2
            className={`${manrope.className} text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-teal-900`}
          >
            Our Company
          </h2>

          <div className="mt-14 flex flex-col-reverse lg:flex-row items-center gap-12">
            {/* Text */}
            <div className="w-full lg:w-1/2">
              <p
                className={`${manrope.className} text-base sm:text-lg md:text-xl leading-8 md:leading-10 font-semibold text-teal-900 text-center lg:text-left`}
              >
                As a trusted Manufacturer, Trader, and Retailer, Herbs Biotic
                is an ISO 9001:2015, ISO 22000:2018, and GMP Certified company,
                committed to the highest standards of quality, food safety, and
                manufacturing excellence. Quality assurance and on-time delivery
                are the foundation of our business, ensuring reliable products
                and complete customer satisfaction.
              </p>
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/about/location.jpeg"
                  alt="Herbs Biotics Office"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-5 flex flex-col items-center gap-8">
          <h3
            className={`${manrope.className} text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-teal-900 leading-relaxed`}
          >
            At <span className="font-black">Herbs Biotics</span>, we create
            premium-quality ingredients that power healthier products for
            people and pets.
          </h3>

          <Link
            href="/product"
            className={`${manrope.className} rounded-full bg-[#E1E53F] px-8 py-4 text-base md:text-lg font-bold text-teal-900 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          >
            See Our Products
          </Link>
        </div>
      </section>
    </section>
  );
}

export default Page;
