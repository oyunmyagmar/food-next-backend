import { NextRequest, NextResponse } from "next/server";
import { deleteNewFoodByFoodId } from "../../../../../lib/services/newfood-service";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { foodId: string } }
) {
  const { foodId } = params;
  let newfoods = await deleteNewFoodByFoodId(foodId);

  console.log(
    "newFoods AfterDeleted====",
    newfoods,
    "====ewFoods AfterDeleted"
  );

  return NextResponse.json({ data: newfoods }, { status: 200 });
}
