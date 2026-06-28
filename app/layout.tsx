import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/layout/Header";
import SmoothScroll from "@/component/layout/lenis";
import Footer from "@/component/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// =======================================================
// 🌍 GLOBAL SEO CONFIGURATION
// Edit these values according to your business.
// =======================================================

export const metadata: Metadata = {
  // Primary title shown on Google
  title: {
    default: "Herbs Biotics | Premium Herbal & Ayurvedic Products",
    template: "%s | Herbs Biotics", // Dynamic page titles
  },

  // Meta description (Keep between 150-160 characters)
  description:
    "Herbs Biotics provides premium herbal, Ayurvedic, and natural healthcare products made with high-quality ingredients for a healthier lifestyle.",

  // Keywords (Not as important today but still useful)
  keywords: [
    "Herbs Biotics",
    "Ayurvedic Products",
    "Herbal Medicine",
    "Natural Supplements",
    "Organic Health",
    "Wellness",
    "Healthcare",
    "Herbal Remedies",
  ],

  // Your website author
  authors: [
    {
      name: "Azimuddeen Khan",
      url: "https://yourwebsite.com", // Replace
    },
  ],

  // Creator
  creator: "Azimuddeen Khan",

  // Publisher
  publisher: "Herbs Biotics",

  // Category
  category: "Health",

  // Helps search engines know canonical URL
  metadataBase: new URL("https://yourdomain.com"), // Replace

  // Canonical URL
  alternates: {
    canonical: "/",
  },

  // Search Engine Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification Tags
  verification: {
    google: "GOOGLE_VERIFICATION_CODE", // Replace
    yandex: "YANDEX_VERIFICATION_CODE",
    yahoo: "YAHOO_VERIFICATION_CODE",
    other: {
      bing: ["BING_VERIFICATION_CODE"],
    },
  },

  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "Herbs Biotics | Premium Herbal Products",

    description:
      "Discover premium herbal, Ayurvedic, and natural healthcare products.",

    url: "https://yourdomain.com",

    siteName: "Herbs Biotics",

    images: [
      {
        url: "/og-image.jpg", // Place inside public/
        width: 1200,
        height: 630,
        alt: "Herbs Biotics",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  // Twitter SEO
  twitter: {
    card: "summary_large_image",

    title: "Herbs Biotics",

    description:
      "Premium Herbal & Ayurvedic Healthcare Products.",

    creator: "@yourtwitter", // Replace

    images: ["/og-image.jpg"],
  },

  // App Icons
  icons: {
    icon: "/favicon.ico",

    shortcut: "/favicon.ico",

    apple: "/apple-touch-icon.png",
  },

  // Manifest
  manifest: "/site.webmanifest",

  // Theme color for browser
  themeColor: "#16a34a",

  // Apple Web App
  appleWebApp: {
    capable: true,
    title: "Herbs Biotics",
    statusBarStyle: "default",
  },

  // Referrer Policy
  referrer: "origin-when-cross-origin",

  // Format Detection
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },

  // Optional Archives
  archives: ["https://yourdomain.com/archive"],

  // Optional Assets
  assets: ["https://yourdomain.com/assets"],

  // Optional Bookmark
  bookmarks: ["https://yourdomain.com"],

  // Extra Metadata
  other: {
    "theme-color": "#16a34a",
    "color-scheme": "light",
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-100">
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}