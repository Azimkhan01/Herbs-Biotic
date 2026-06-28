import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const products = await prisma.products.findMany({
      where: {
        OR: [
          {
            Extract_Name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            Botanical_Name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            Active_Compound: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            categories: {
              category_name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },

      take: 12,

      orderBy: {
        Extract_Name: "asc",
      },

      select: {
        id: true,
        Extract_Name: true,
        Botanical_Name: true,
        Unit_in_Order: true,
        Active_Compound: true,

        product_images: {
          take: 1,
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}