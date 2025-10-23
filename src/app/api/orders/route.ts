import { createOrder, getAllOrders } from "@/lib/services/order-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  let orders = await getAllOrders();
  const response = NextResponse.json({ data: orders }, { status: 200 });
  console.log("+++++ALL ORDERS", orders, "ALL ORDERS+++++");

  return response;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { cartFoods, cartItemsTotalPrice } = body;

  console.log(cartFoods, "===cartFoods===");
  console.log(cartItemsTotalPrice, "===cartItemsTotalPrice===");

  await createOrder({ cartFoods, cartItemsTotalPrice });

  return new NextResponse(JSON.stringify({ message: "Order created" }), {
    status: 200,
  });
}
