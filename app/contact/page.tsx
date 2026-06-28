import type { Metadata } from "next";

import Hero from "@/component/common/Hero";
import CurveDivider from "@/component/common/Wave";
import AnimatedMap from "@/component/contact/AnimatedMap";
import Mail from "@/component/contact/Mail";
import SmallCard from "@/component/contact/SmallCard";
import { manrope } from "@/font/font";

// =======================================================
// 📌 CONTACT PAGE SEO
// Edit these values according to your business.
// =======================================================

export const metadata: Metadata = {
  // Page Title
  title: "Contact Us | Herbs Biotics",

  // Meta Description (150-160 characters)
  description:
    "Get in touch with Herbs Biotics for product inquiries, customer support, partnerships, or any questions about our herbal and Ayurvedic healthcare solutions.",

  // SEO Keywords
  keywords: [
    "Contact Herbs Biotics",
    "Herbs Biotics Contact",
    "Customer Support",
    "Herbal Products",
    "Ayurvedic Products",
    "Natural Healthcare",
  ],

  // Canonical URL
  alternates: {
    canonical: "/contact",
  },

  // Search Engine Instructions
  robots: {
    index: true,
    follow: true,
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "Contact Herbs Biotics",

    description:
      "Reach out to Herbs Biotics for support, inquiries, and business partnerships.",

    url: "https://yourdomain.com/contact", // Replace

    siteName: "Herbs Biotics",

    type: "website",

    images: [
      {
        url: "/og-contact.jpg", // Add this image in /public
        width: 1200,
        height: 630,
        alt: "Contact Herbs Biotics",
      },
    ],
  },

  // Twitter Preview
  twitter: {
    card: "summary_large_image",

    title: "Contact Herbs Biotics",

    description:
      "Contact Herbs Biotics for herbal and Ayurvedic product support.",

    images: ["/og-contact.jpg"],
  },
};

export default function Page() {
  return (
    <section className="py-22">
      <Hero
        title="Contact"
        current={{ name: "Contact", link: "/contact" }}
      >
        <SmallCard />
      </Hero>

      <CurveDivider color="#FFFFFF" className="bg-[#F3F4F6]" />

      <div className="flex justify-center items-center bg-white p-5">
        <p className={`text-6xl font-extrabold ${manrope.className} text-teal-900`}>
          Our Site
        </p>
      </div>

      <AnimatedMap />

      <Mail />
    </section>
  );
}