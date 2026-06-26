
"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { archivo_black } from "@/font/font";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // =======================
  // Media
  // =======================
  const images = [
    "https://media.istockphoto.com/id/1344923073/photo/a-lake-in-the-shape-of-human-footprints-in-the-middle-of-a-lush-forest-as-a-metaphor-for-the.jpg?b=1&s=612x612&w=0&k=20&c=OiarzFdUheqgX-6cesGyj149iBLsS80kKQtfuF8cKYs=",
    "https://images.unsplash.com/photo-1525304937537-4d586f394674?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    "https://images.pexels.com/photos/37586668/pexels-photo-37586668.jpeg",
  ];

  const videos = [
    "https://www.pexels.com/download/video/36511267/",
    "https://www.pexels.com/download/video/5866128/",
    "https://www.pexels.com/download/video/36329571/",
  ];

  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [imageIndex, setImageIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width:768px)",
        desktop: "(min-width:769px)",
      },
      (context) => {
        const { mobile } = context.conditions!;

        gsap.to(sectionRef.current, {
          scale: mobile ? 0.94 : 0.88,
          borderRadius: mobile ? 30 : 50,
          ease: "none",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen m-2.5 overflow-hidden rounded-[50px] bg-[#94A26D] will-change-transform"
      >
        {/* Background */}
        {mediaType === "image" ? (
          <img
            src={images[imageIndex]}
            alt="Hero"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            key={videoIndex}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videos[videoIndex]} type="video/mp4" />
          </video>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
          <h1
            className={`${archivo_black.className} text-center uppercase tracking-wider text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl`}
          >
            Herbs Biotic
          </h1>

          <button
            className="mt-10 rounded-full bg-white p-4 font-black text-teal-900 flex items-center gap-4"
          >
            <span>Discover Products</span>

            <span className="rounded-full bg-[#E1E53F] p-1">
              <ArrowRight />
            </span>
          </button>
        </div>
      </section>

      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 z-[9999] rounded-2xl bg-black/80 p-4 backdrop-blur text-white shadow-xl">
        <div className="flex flex-col gap-3 w-48">

          <button
            onClick={() => setMediaType("image")}
            className={`rounded-lg py-2 transition ${
              mediaType === "image"
                ? "bg-green-500"
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
          >
            Show Images
          </button>

          <button
            onClick={() => setMediaType("video")}
            className={`rounded-lg py-2 transition ${
              mediaType === "video"
                ? "bg-blue-500"
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
          >
            Show Videos
          </button>

          {mediaType === "image" && (
            <>
              <button
                onClick={() =>
                  setImageIndex((prev) => (prev - 1 + images.length) % images.length)
                }
                className="rounded-lg bg-neutral-700 py-2 hover:bg-neutral-600"
              >
                ◀ Previous Image
              </button>

              <button
                onClick={() =>
                  setImageIndex((prev) => (prev + 1) % images.length)
                }
                className="rounded-lg bg-white text-black py-2 hover:bg-neutral-200"
              >
                Next Image ▶
              </button>

              <p className="text-center text-xs">
                {imageIndex + 1} / {images.length}
              </p>
            </>
          )}

          {mediaType === "video" && (
            <>
              <button
                onClick={() =>
                  setVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
                }
                className="rounded-lg bg-neutral-700 py-2 hover:bg-neutral-600"
              >
                ◀ Previous Video
              </button>

              <button
                onClick={() =>
                  setVideoIndex((prev) => (prev + 1) % videos.length)
                }
                className="rounded-lg bg-white text-black py-2 hover:bg-neutral-200"
              >
                Next Video ▶
              </button>

              <p className="text-center text-xs">
                {videoIndex + 1} / {videos.length}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

