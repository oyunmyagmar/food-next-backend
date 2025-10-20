import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/User";

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();

  const { email, password } = body;

  const registeredUser = await User.findOne({ email });

  console.log({ registeredUser });

  const isVerified = bcrypt.compareSync(password, registeredUser.password);

  console.log({ isVerified });
  if (isVerified) {
    return NextResponse.json({ message: "Login successfull" });
  } else {
    return NextResponse.json({ message: "Incorrect password" });
  }
}
