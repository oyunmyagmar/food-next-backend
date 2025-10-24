import { deleteCategoryById } from "@/lib/services/category-service";
import { NextRequest, NextResponse } from "next/server";
type Params = Promise<{ id: string }>;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;
  let categories = await deleteCategoryById(id);

  // console.log(
  //   "newCategoriesAfterDeleted===",
  //   categories,
  //   "===newCategoriesAfterDeleted"
  // );

  return NextResponse.json({ data: categories }, { status: 200 });
}
