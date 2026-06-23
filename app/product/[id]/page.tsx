import ProductImageGallery from "@/component/product/ProductGallery";
import { archivo_black, manrope } from "@/font/font";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span
      className={`
        ${manrope.className}
        rounded-full
        border
        border-gray-200
        bg-white
        px-4
        py-2
        text-xs
        sm:text-sm
        font-medium
        tracking-wide
        text-teal-900
        shadow-sm
        transition-all
        hover:border-[#E1E53F]
        hover:bg-[#E1E53F]
      `}
    >
      {children}
    </span>
  );
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const product = await prisma.products.findUnique({
    where: {
      id,
    },
    include: {
      product_images: true,
      categories: true,
      recommended_products: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <section className="mt-20 md:mt-28 lg:mt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Image Gallery */}
          <div className="lg:sticky lg:top-28">
            <ProductImageGallery images={product.product_images} />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-8 text-teal-900">
            {/* Heading */}
            <div>
              <h1
                className={`
                  ${archivo_black.className}
                  text-3xl
                  leading-tight
                  tracking-wide
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                  xl:text-7xl
                `}
              >
                {product.Botanical_Name}
              </h1>

              {product.Primary_Benefit && (
                <p
                  className={`
                    ${manrope.className}
                    mt-5
                    text-base
                    leading-7
                    text-gray-600
                    sm:text-lg
                  `}
                >
                  {product.Primary_Benefit}
                </p>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge>{product.categories.category_name}</Badge>

              {product.Extract_Name && (
                <Badge>{product.Extract_Name}</Badge>
              )}

              {product.Package_Size && (
                <Badge>{product.Package_Size}</Badge>
              )}

              {product.Part_Used && (
                <Badge>{product.Part_Used}</Badge>
              )}

              {product.Active_Compound && (
                <Badge>{product.Active_Compound}</Badge>
              )}

              {product.Unit_in_Order && (
                <Badge>{product.Unit_in_Order}</Badge>
              )}
            </div>

            {/* Product Information */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2
                className={`${archivo_black.className} mb-6 text-2xl text-teal-900`}
              >
                Product Details
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <InfoItem
                  title="Botanical Name"
                  value={product.Botanical_Name}
                />

                <InfoItem
                  title="Extract Name"
                  value={product.Extract_Name}
                />

                <InfoItem
                  title="Category"
                  value={product.categories.category_name}
                />

                <InfoItem
                  title="Part Used"
                  value={product.Part_Used}
                />

                <InfoItem
                  title="Package Size"
                  value={product.Package_Size}
                />

                <InfoItem
                  title="Unit"
                  value={product.Unit_in_Order}
                />

                <InfoItem
                  title="Active Compound"
                  value={product.Active_Compound}
                />

                <InfoItem
                  title="Extraction Ratio"
                  value={product.Typical_Extraction_Ratio}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  title,
  value,
}: {
  title: string;
  value?: string | null;
}) {
  if (!value) return null;

  return (
    <div className="space-y-1 rounded-xl bg-gray-50 p-4">
      <p
        className={`${manrope.className} text-xs font-semibold uppercase tracking-widest text-gray-500`}
      >
        {title}
      </p>

      <p
        className={`${manrope.className} text-base font-medium text-teal-900`}
      >
        {value}
      </p>
    </div>
  );
}