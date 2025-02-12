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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestOtp = void 0;
const __1 = require("../..");
const nodemailer_1 = __importDefault(require("nodemailer"));
const requestOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield __1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (user) {
        const otp = Math.floor(Math.random() * 899999 + 100000);
        yield __1.prisma.otp.create({
            data: {
                email,
                otp,
            },
        });
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
                user: "nandir.be@gmail.com",
                pass: process.env.NODEMAILER_PASS,
            },
        });
        try {
            const info = yield transporter.sendMail({
                from: "nandir.be@gmail.com",
                to: email,
                subject: "Buy me Coffee OTP",
                text: String(otp),
            });
            console.log("Message sent: %s", info.messageId);
        }
        catch (error) {
            console.log(error);
        }
        res.json({
            code: "SENT_OTP",
            data: null,
            message: "Sent OTP",
            success: true,
        });
        // send mail with generated password
        return;
    }
    res.status(409).json({
        success: false,
        message: "User doesn't exist",
        code: "USER_NOT_FOUND",
        data: null,
    });
});
exports.requestOtp = requestOtp;
