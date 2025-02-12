"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
exports.authRouter = express_1.default.Router();
exports.authRouter
    .post("/sign-up", auth_1.signupController)
    .post("/sign-in", auth_1.signinController)
    .patch("/update/:userId", auth_1.updatePasswordController)
    .post("/verify-otp", auth_1.verifyOtpController)
    .post("/token", auth_1.getTokenController)
    .post("/request-otp", auth_1.requestOtpController);
