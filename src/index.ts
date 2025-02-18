import { PrismaClient } from "@prisma/client";
import express from "express";
import { authRouter } from "./routers/auth-router";
import { userRouter } from "./routers/user-router";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3001", "next-jwt-authentication-murex.vercel.app"] }));
app.use(express.json());

app.use("/auth", authRouter);
app.use(userRouter);



app.listen(process.env.PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
`)
);
export const prisma = new PrismaClient();
