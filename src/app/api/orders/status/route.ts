import { updateOrder } from "@/lib/services/order-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, newStatus } = body;

    console.log(orderId, "orderId");
    console.log(newStatus, "newStatus");

    await updateOrder(orderId, newStatus);

    return NextResponse.json({});
  } catch (error) {
    console.error(error);
  }
}
