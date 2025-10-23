import { NextRequest, NextResponse } from "next/server";
type Params = Promise<{ email: string }>;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { email } = await params;
  const body = await request.json();
  const { address } = body;
  console.log(email, "EMAIL", address, "ADDRESS");
  //   let user = await editUser(address, email);
  //   console.log("Final Edited User Data");
  return NextResponse;
}
