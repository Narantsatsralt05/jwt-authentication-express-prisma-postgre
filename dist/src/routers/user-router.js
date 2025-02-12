"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const get_users_controller_1 = require("../controllers/user/get-users-controller");
const verify_1 = require("../verify");
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/users', verify_1.verify, get_users_controller_1.getUsers);
