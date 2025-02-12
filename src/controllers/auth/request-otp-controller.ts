import { Request, Response } from "express";
import { prisma } from "../..";
import nodemailer from "nodemailer";

export const requestOtpController = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    const otp = Math.floor(Math.random() * 899999 + 100000);
    await prisma.otp.deleteMany({
      where: {
        email
      }
    })
    await prisma.otp.create({
      data: {
        email,
        otp,
      },
    });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "nandir.be@gmail.com",
        pass: process.env.NODEMAILER_PASS,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: "nandir.be@gmail.com",
        to: email,
        subject: "Buy me Coffee OTP",
        text: String(otp),
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.log(error);
    }

    res.json({
      code: "SENT_OTP",
      data: null,
      message: "Sent OTP",
      success: true,
    });
    return;
  }
  res.status(409).json({
    success: false,
    message: "User doesn't exist",
    code: "USER_NOT_FOUND",
    data: null,
  });
};
