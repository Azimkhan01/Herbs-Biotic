"use client";

import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import type { CarouselApi } from "@/components/ui/carousel";

interface ProductImage {
  id: string;
  url: string;
}

interface Props {
  images: ProductImage[];
}

export default function ProductImageGallery({ images }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setSelected(api.selectedScrollSnap());

    const onSelect = () => {
      setSelected(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4">
      {/* Main Slider */}
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative h-[280px] sm:h-[380px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-[32px] bg-[#F6F7F8]">
                <Image
                  src={image.url}
                  alt="Product Image"
                  fill
                  priority
                  className="object-contain p-4 sm:p-6 md:p-8 transition-transform duration-300 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            aria-label={`View image ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
            className={`
              flex-shrink-0
              overflow-hidden
              rounded-2xl
              border-2
              transition-all
              duration-300
              ${
                selected === index
                  ? "border-teal-800 ring-2 ring-teal-800/20"
                  : "border-gray-200"
              }
            `}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="
                h-16
                w-16
                sm:h-20
                sm:w-20
                object-cover
              "
            />
          </button>
        ))}
      </div>

      {/* Dots Indicator (Mobile) */}
      <div className="flex justify-center gap-2 sm:hidden">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              selected === index
                ? "w-6 bg-teal-900"
                : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}