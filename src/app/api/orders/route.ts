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

    console.log("==userId==", userId, "==userId==");
    console.log(
      "==cartItemsTotalPrice==",
      cartItemsTotalPrice,
      "==cartItemsTotalPrice=="
    );
    console.log("==cartFoods==", cartFoods, "==cartFoods==");
    console.log("==address==", address, "==address==");

    await createOrder({ userId, cartFoods, cartItemsTotalPrice });

    await updateUser(userId, address);

    return NextResponse.json({
      success: true,
      message: "Data received successfully",
    });
  } catch (error) {
    console.error("Error processing data", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internel Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
