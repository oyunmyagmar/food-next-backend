import { NextRequest, NextResponse } from "next/server";
import { deleteFoodById } from "../../../../../lib/services/food-service";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id, "id=======================");
  let foods = await deleteFoodById(id);

  console.log("newFoods===", foods, "===newFoods");

  return NextResponse.json({ data: foods }, { status: 200 });
}
