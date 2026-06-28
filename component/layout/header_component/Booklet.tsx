"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import { BookOpen, X, ChevronLeft, ChevronRight } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Booklet() {
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState(0);

  const bookRef = useRef<any>(null);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button 
      title="t"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl transition-all hover:scale-110"
      >
        <BookOpen size={28} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button 
            title="t"
              onClick={() => setOpen(false)}
              className="absolute -top-5 right-0 z-50 rounded-full bg-white p-2 shadow-xl transition hover:scale-110"
            >
              <X size={22} />
            </button>

            {/* Previous */}
            <button 
            title="t"
              onClick={() => bookRef.current?.pageFlip().flipPrev()}
              className="absolute left-2 md:-left-14 z-50 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl"
            >
              <ChevronLeft />
            </button>

            <Document
              file="/booklet/Catalogue Herbs Biotic.pdf"
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={
                <div className="text-white text-lg">
                  Loading catalogue...
                </div>
              }
            >
              <HTMLFlipBook
                ref={bookRef}
                width={500}
                height={700}
                minWidth={280}
                maxWidth={500}
                minHeight={400}
                maxHeight={700}
                showCover
                drawShadow
                flippingTime={800}
                mobileScrollSupport
                usePortrait={true}
                startPage={0}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
                className="shadow-2xl"
                style={{}}
                size="fixed"
                maxShadowOpacity={0.5}
              >
                {Array.from({ length: numPages }, (_, index) => (
                  <div
                    key={index}
                    className="flex h-full w-full items-center justify-center bg-white"
                  >
                    <Page
                      pageNumber={index + 1}
                      width={500}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            </Document>

            {/* Next */}
            <button 
            title="t"
              onClick={() => bookRef.current?.pageFlip().flipNext()}
              className="absolute right-2 md:-right-14 z-50 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl"
            >
              <ChevronRight />
            </button>

            {/* Mobile Controls */}
            <div className="absolute -bottom-16 flex gap-4 md:hidden">
              <button 
              title="t"
                onClick={() => bookRef.current?.pageFlip().flipPrev()}
                className="rounded-full bg-white p-3 shadow-xl"
              >
                <ChevronLeft />
              </button>

              <button 
              title="t"
                onClick={() => bookRef.current?.pageFlip().flipNext()}
                className="rounded-full bg-white p-3 shadow-xl"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}