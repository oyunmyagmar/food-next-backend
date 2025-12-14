import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;

    const registeredUser = await User.findOne({ email });

    if (!registeredUser) {
      return NextResponse.json(
        { succes: false, message: "Invalid email. Please try again" },
        { status: 401 }
      );
    }

    // status code 200 yavulad errorCode bichih frontend der errorCode - oo console.log esvel alert() shud harah
    const isVerified = bcrypt.compareSync(password, registeredUser.password);
    if (!isVerified) {
      return NextResponse.json(
        {
          success: false,
          erroCode: "INVALID_PASS",
          message: "Incorrect password. Please try again",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "Login successful! Welcome back.",
          user: registeredUser,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error, "error");
    return NextResponse.json(
      {
        success: false,
        message: "Login request failed.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
