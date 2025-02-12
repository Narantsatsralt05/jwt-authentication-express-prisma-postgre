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
exports.signupController = void 0;
const __1 = require("../..");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const isUserExist = yield __1.prisma.user.findUnique({
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
    const hashedPass = bcryptjs_1.default.hashSync(password, 10);
    const user = yield __1.prisma.user.create({
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
});
exports.signupController = signupController;
