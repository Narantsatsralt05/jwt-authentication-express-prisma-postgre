"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("./routers/auth-router");
const user_router_1 = require("./routers/user-router");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:3001' }));
app.use(express_1.default.json());
app.use("/auth", auth_router_1.authRouter);
app.use(user_router_1.userRouter);
app.listen(process.env.PORT, () => console.log(`
🚀 Server ready at: http://localhost:3000
`));
exports.prisma = new client_1.PrismaClient();
