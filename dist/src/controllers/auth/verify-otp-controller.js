"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpController = void 0;
const __1 = require("../..");
const verifyOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userOtp } = req.body;
    const user = yield __1.prisma.user.findUnique({
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
    const otp = yield __1.prisma.otp.findFirst({
        where: {
            email,
        },
    });
    if ((otp === null || otp === void 0 ? void 0 : otp.otp) == userOtp) {
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
});
exports.verifyOtpController = verifyOtpController;
