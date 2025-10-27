import { createOrder, getAllOrders } from "@/lib/services/order-service";
import { updateUser } from "@/lib/services/user-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  let orders = await getAllOrders();
  const response = NextResponse.json({ data: orders }, { status: 200 });
  console.log("+++++ALL ORDERS", orders, "ALL ORDERS+++++");

  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, cartItemsTotalPrice, cartFoods, address } = body;

    console.log(userId, "===userId===");
    console.log(cartItemsTotalPrice, "===cartItemsTotalPrice===");
    console.log(cartFoods, "===cartFoods===");
    console.log(address, "===address===");

    await createOrder({ userId, cartFoods, cartItemsTotalPrice });

    await updateUser(userId, address);

    return NextResponse.json(
      {
        success: true,
        message: "Order has been successfully placed !",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error processing order data", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process order data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
