import { updateBulkOrder } from "@/lib/services/order-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { ordersId, newStatus } = await request.json();

  if (!Array.isArray(ordersId) || ordersId.length === 0 || !newStatus) {
    return NextResponse.json({ message: "Miising or invalid parameters!" });
  }

  await updateBulkOrder(ordersId, newStatus);

  return NextResponse.json({ message: "Bulk status updated!" });
}
