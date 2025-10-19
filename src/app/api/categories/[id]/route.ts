import { deleteCategoryById } from "@/lib/services/category-service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  let categories = await deleteCategoryById(id);

  console.log(
    "newCategoriesAfterDeleted===",
    categories,
    "===newCategoriesAfterDeleted"
  );

  return NextResponse.json({ data: categories }, { status: 200 });
}
