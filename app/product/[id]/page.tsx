import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
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
    <section className="mt-22">
     {/* part 1  */}
     <div>
        {/* heading */}
        <div>
            <h1></h1>
        </div>
       {/* descriotion  */}
        <div>
            <p>Description</p>
        </div>
     </div>
    </section>
  );
}

//  <p>{product.Botanical_Name}</p>
//         <p>{product.Part_Used}</p>
//         <p>{product.Active_Compound}</p>
//         <p>{product.Primary_Benefit}</p>
//         <p>{product.Package_Size}</p>
//         <p>{product.Unit_in_Order}</p>