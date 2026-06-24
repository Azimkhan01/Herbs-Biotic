import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required",
        },
        { status: 400 }
      );
    }

    const product = await prisma.products.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    const extractKeyword =
      product.Extract_Name?.trim()?.split(" ")[0] || "";

    const orConditions: any[] = [
      {
        Category: product.Category,
      },
    ];

    if (product.Botanical_Name) {
      orConditions.push({
        Botanical_Name: {
          contains: product.Botanical_Name,
        },
      });
    }

    if (extractKeyword) {
      orConditions.push({
        Extract_Name: {
          contains: extractKeyword,
        },
      });
    }

    const similarProducts = await prisma.products.findMany({
      where: {
        AND: [
          {
            id: {
              not: product.id,
            },
          },
          {
            OR: orConditions,
          },
        ],
      },

      include: {
        product_images: true,
        categories: true,
      },

      take: 8,
    });

    return NextResponse.json({
      success: true,
      count: similarProducts.length,
      products: similarProducts,
    });
  } catch (error) {
    console.error("Similar products error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}