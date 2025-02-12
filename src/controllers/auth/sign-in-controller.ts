import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../..";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../../generateAccessToken";

export const signinController = async (req: Request, res: Response) => {
  const { password, email } = req.body;

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
    return;
  }

  const isValid = bcrypt.compareSync(password, user.password!);
  if (isValid) {
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "24h" }
    );

    const accessToken = generateAccessToken(user.id);
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Successfully signed in",
        code: "SIGNED_IN",
      });
    return;
  }

  res.json({
    success: false,
    message: "Check your password",
    code: "PASSWORD_INCORRECT",
    data: null,
  });
};
