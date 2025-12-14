import { getUserOrders } from "@/lib/services/order-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const userOrders = await getUserOrders(email);

  const response = NextResponse.json({ data: userOrders }, { status: 200 });
  return response;
}
