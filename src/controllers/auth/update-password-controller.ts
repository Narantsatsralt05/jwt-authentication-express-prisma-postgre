import { Request, Response } from "express";
import { prisma } from "../..";
import bcrypt from "bcryptjs";

export const updatePasswordController = async (req: Request, res: Response) => {
  const { newPassword, email } = req.body;
  const { userId } = req.params
  if (isNaN(Number(userId))) {
    res.status(422).json({
        success: false,
        code: "INVALID_ID",
        message: "Invalid user ID",
      });
  }
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        password: hashedPassword,
      },
    });
    res.json({
      success: true,
      code: "UPDATE_PASSWORD",
      message: "Sucessfully updated password",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      code: "CANNOT_UPDATE_PASSWORD",
      message: "Didn't update password",
      error
    });
  }
};
