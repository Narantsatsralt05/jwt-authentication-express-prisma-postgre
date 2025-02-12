import express from "express";
import { getUsers } from "../controllers/user/get-users-controller";
import { verify } from "../verify";

export const userRouter = express.Router();

userRouter.get('/users',verify, getUsers)


