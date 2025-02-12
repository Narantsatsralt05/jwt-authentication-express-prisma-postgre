import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../..";
import bcrypt from 'bcryptjs'

export const signupController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    //
    res.status(409).json({
      success: false, //
      message: "User already exists",
      code: "USER_EXISTS",
      data: null,
    });
    return;
  }
  const hashedPass = bcrypt.hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPass,
    },
  });
  res.status(201).json({
    success: true,
    data: user,
    code: "SUCCESS",
    message: "Successfully signed up",
  });
};
