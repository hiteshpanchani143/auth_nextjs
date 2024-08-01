import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";
import { Flamenco } from "next/font/google";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    //TODO- add more validation whene get empty data
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists",status: 400,success:false },
      );
    }
    const user = await User.find({ email });
    if (user) {
      NextResponse.json({ error: "User already exits" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    // send varification email
    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({
      message: "User registred successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 500,
    });
  }
}
