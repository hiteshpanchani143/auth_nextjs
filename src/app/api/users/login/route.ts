import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({email});

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User does not exits",
        status: 400,
      });
    }
    console.log("user exits");
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        success: false,
        error: "invalid credisials",
        status: 400,
      });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      success:true,
      status: 200,
      message: "user login success",
    });
    response.cookies.set("token", token,{
      httpOnly:true,
      secure:true
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 500,
    });
  }
}
