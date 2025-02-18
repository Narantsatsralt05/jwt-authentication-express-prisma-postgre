import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const verify = (req: Request, res: Response, next: NextFunction) => {

  let token = req.headers.authorization;

  if (!token) {
    res.status(401).send("Access Denied. No refresh token provided.");
    return;
  }
  
  const accessToken = token.toString().split(' ')[1]

  try {
    jwt.verify(accessToken!, process.env.ACCESS_TOKEN_SECRET!);
    next();
  } catch (error) {
    res.status(400).send("Invalid Token.");
  }
};
