import { NextRequest, NextResponse } from "next/server";
import { createOrder, getAllOrders } from "@/lib/services/order-service";
import { updateUser } from "@/lib/services/user-service";

export async function GET() {
  let orders = await getAllOrders();
  const response = NextResponse.json({ data: orders }, { status: 200 });

  return response;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, cartItemsTotalPrice, cartFoods, address } = body;

    if (!userId || !cartItemsTotalPrice || !cartFoods?.length || !address) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    await createOrder({ userId, cartFoods, cartItemsTotalPrice });
    await updateUser(userId, address);

    return new NextResponse("Your order has been successfully placed!", {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return new NextResponse("Internel Server Error", { status: 500 });
  }
}
