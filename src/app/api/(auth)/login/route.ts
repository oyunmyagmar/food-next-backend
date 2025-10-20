import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { User } from "@/lib/models/User";

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();

  const { email, password } = body;

  const registeredUser = await User.findOne({ email });
  console.log(registeredUser, "bga");

  const hashPassword = registeredUser.password;
  console.log(hashPassword, "hash pass ");
  // pass shalgah
  const isVerified = bcrypt.compareSync(hashPassword, password);
  console.log(isVerified, "isvery");
  if (isVerified == true) {
    return NextResponse.json({ message: "bga" });
  } else {
    return NextResponse.json({ message: "bhgui" });
  }
}
