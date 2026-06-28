import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  
  try {
    
    const categories = await prisma.categories.findMany({
      select: {
        category_id: true,
        category_name: true,
      },
      orderBy: {
        category_name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        data: [],
      },
      { status: 500 }
    );
  }
}