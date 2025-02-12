import { Request, Response } from "express";
import { prisma } from "../..";

export const verifyOtpController = async (req: Request, res: Response) => {
  const { email, userOtp } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(409).json({
      success: false,
      message: "User doesn't exist",
      code: "USER_NOT_FOUND",
      data: null,
    });
  }
  const otp = await prisma.otp.findFirst({
    where: {
      email,
    },
  });
  if (otp?.otp == userOtp) {
    res.json({
      success: true,
      code: "OTP_VERIFIED",
      message: "Successfully verified OTP",
      data: null,
    });
    return;
  }
  res.json({
    success: false,
    code: "OTP_INCORRECT",
    message: "OTP ditn't match",
    data: null,
  });
};
