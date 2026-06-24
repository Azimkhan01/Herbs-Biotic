"use client";

import Link from "next/link";
import { RxCross1 } from "react-icons/rx";

interface Props {
  isNavbar: boolean;
  setIsNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileSideNavbar({ isNavbar, setIsNavbar }: Props) {
  return (
    <div
      className={`
        fixed inset-0 z-50 md:hidden
        transition-all duration-300
        ${isNavbar ? "pointer-events-auto" : "pointer-events-none"}
      `}
    >
      {/* Overlay */}
      <div
        className={`
          absolute inset-0 bg-black/30
          transition-opacity duration-300
          ${isNavbar ? "opacity-100" : "opacity-0"}
        `}
        onClick={() => setIsNavbar(false)}
      />

      {/* Sidebar */}
      <div
        className={`
          absolute top-0 left-0 h-full w-4/6
          bg-gray-100 text-teal-900 p-6
          transition-transform duration-300 ease-out
          ${isNavbar ? "translate-x-0 delay-150" : "-translate-x-full"}
        `}
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button title="Close" onClick={() => setIsNavbar(false)}>
            <RxCross1 className="text-3xl" />
          </button>
        </div>

        {/* Menu */}
        <div className="mt-8 flex flex-col">
          {/* Home */}
          <div className="border-b border-black/10 py-3">
            <Link
              href="/"
              className="block text-lg font-medium uppercase"
              onClick={() => setIsNavbar(false)}
            >
              Home
            </Link>
          </div>

          {/* Product */}
          <div className="border-b border-black/10 py-3">
            <Link
              href="/product"
              className="block text-lg font-medium uppercase"
              onClick={() => setIsNavbar(false)}
            >
              Product
            </Link>
          </div>

          {/* Contact */}
          <div className="border-b border-black/10 py-3">
            <Link
              href="/contact"
              className="block text-lg font-medium uppercase"
              onClick={() => setIsNavbar(false)}
            >
              Contact
            </Link>
          </div>

          {/* Certification */}
          <div className="border-b border-black/10 py-3">
            <Link
              href="/certification"
              className="block text-lg font-medium uppercase"
              onClick={() => setIsNavbar(false)}
            >
              Certification
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileSideNavbar;