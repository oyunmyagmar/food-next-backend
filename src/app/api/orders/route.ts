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
  const body = await request.json();
  const { id, cartItemsTotalPrice, cartFoods, address } = body;

  console.log(id, "===id===");
  console.log(cartItemsTotalPrice, "===cartItemsTotalPrice===");
  console.log(cartFoods, "===cartFoods===");
  console.log(address, "===address===");

  await createOrder({ user: id, cartFoods, cartItemsTotalPrice });

  await updateUser(id, address);

  return new NextResponse(JSON.stringify({ message: "Order created" }), {
    status: 200,
  });
}
