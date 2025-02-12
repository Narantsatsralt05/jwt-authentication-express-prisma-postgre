import express from "express";
import {
  signinController,
  signupController,
  verifyOtpController,
  requestOtpController,
  updatePasswordController,
  getTokenController
} from "../controllers/auth";

export const authRouter = express.Router();

authRouter
  .post("/sign-up", signupController)
  .post("/sign-in", signinController)
  .patch("/update/:userId", updatePasswordController)
  .post("/verify-otp", verifyOtpController)
  .post("/token", getTokenController)
  .post("/request-otp", requestOtpController);
