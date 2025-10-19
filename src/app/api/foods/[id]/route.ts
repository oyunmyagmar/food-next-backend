import { deleteFoodById, updateFoodById } from "@/lib/services/food-service";
import { NextRequest, NextResponse } from "next/server";

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id, "IDIDIDIDIDID==========");
  const body = await request.json();
  console.log(body, "edited body suuld");

  let foods = await updateFoodById(id);
  console.log("aditedFoods===", foods, "===edited`Foods");

  return NextResponse.json({ data: foods }, { status: 200 });
}
