import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
    console.log(user)
    if (!user) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "you are not verified, please signup.",
      });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();
console.log(user)
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Email verified succesfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}
