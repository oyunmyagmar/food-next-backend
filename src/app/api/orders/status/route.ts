import { updateOrder } from "@/lib/services/order-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, newStatus } = body;

    await updateOrder(orderId, newStatus);

    return NextResponse.json({ message: "Status updated!" });
  } catch (error) {
    console.error(error);
  }
}
