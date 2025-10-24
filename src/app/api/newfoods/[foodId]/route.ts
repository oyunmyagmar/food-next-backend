import { deleteNewFoodByFoodId } from "@/lib/services/newfood-service";
import { NextRequest, NextResponse } from "next/server";
type Params = Promise<{ foodId: string }>;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { foodId } = await params;
  let newfoods = await deleteNewFoodByFoodId(foodId);

  // console.log(
  //   "newFoods AfterDeleted====",
  //   newfoods,
  //   "====ewFoods AfterDeleted"
  // );

  return NextResponse.json({ data: newfoods }, { status: 200 });
}
