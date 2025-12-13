import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  console.log({ email });
  const userOrders = await getUserOrders(email);

  const response = NextResponse.json({ data: userOrders }, { status: 200 });
  return response;
}
