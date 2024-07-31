import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout successfully",
      status: 200,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
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
