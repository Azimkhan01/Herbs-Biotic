import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get("category");

  const data = await prisma.recommended_products.findMany({
    where: categoryId
      ? {
          products: {
            Category: categoryId,
          },
        }
      : undefined,
    include: {
      products: {
        include: {
          product_images: true,
          categories: true,
        },
      },
    },
  });

  return NextResponse.json(data);
}