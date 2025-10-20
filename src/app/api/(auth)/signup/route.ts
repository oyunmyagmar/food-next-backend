import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/User";

export async function POST(request: NextRequest) {
  await connectDB();

  const body = await request.json();
  const { email, password } = body;

  const hashPassword = bcrypt.hashSync(password, 10);

  console.log(password, "pass");
  console.log(hashPassword, "hash");

  const user = await User.create({
    email: email,
    password: hashPassword,
    role: "USER",
  });

  if ((await User.findOne({ email })) === email) {
    console.log("butgeltei");
  }
  // email burtgeltei eseh?

  return NextResponse.json(
    { message: "Successfully created user", user },
    { status: 200 }
  );
}
