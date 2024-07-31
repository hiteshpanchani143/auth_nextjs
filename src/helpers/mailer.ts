import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import nodemailer from "nodemailer";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    // here bcryptjs give us special character($,.), its generated issue thats why we use urlEncoded so best way to use uuid library
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // below information please put in env for safty
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "04c9ab806d6ecd",
        pass: "adbca2c77ccd41"
      }
    });

    const mailOptions = {
      from: "hiteshpanchaniweb@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "verify" ? "Verify your email" : "Reset your password", // Subject line
      //   text: "Hello world?", // plain text 
      // below html code only for verify email, make variable for verify email and forgot password reset html above.
      html: `<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY"? "verify your email " :" reset your password"} or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, // html body
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.messagei);
  }
};
