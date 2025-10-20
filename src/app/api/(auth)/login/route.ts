import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { User } from "@/lib/models/User";

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();

  const { email, password } = body;

  const registeredUser = await User.findOne({ email });
  console.log(registeredUser, "registeredUser");

  const hashPassword = registeredUser?.password;
  console.log(hashPassword, "hashPassword");

  const isVerified = bcrypt.compareSync(password, hashPassword);
  console.log(isVerified, "isVerified");
  if (isVerified) {
    return NextResponse.json({ message: "Login successfull" });
  } else {
    return NextResponse.json({ message: "Incorrect password" });
  }
}
