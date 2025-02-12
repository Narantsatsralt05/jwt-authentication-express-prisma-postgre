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
exports.signinController = void 0;
const __1 = require("../..");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken_1 = require("../../generateAccessToken");
const signinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
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
        return;
    }
    const isValid = bcryptjs_1.default.compareSync(password, user.password);
    if (isValid) {
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "24h" });
        const accessToken = (0, generateAccessToken_1.generateAccessToken)(user.id);
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
});
exports.signinController = signinController;
