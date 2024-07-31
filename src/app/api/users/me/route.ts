import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId =await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "invalid token",
        status: 400,
      });
    }
    return NextResponse.json({
      success: true,
      status: 200,
      message: "user found successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 500,
    });
  }
}
