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
exports.signupController = void 0;
const __1 = require("../..");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, posts, password } = req.body;
    const postData = posts === null || posts === void 0 ? void 0 : posts.map((post) => {
        return { title: post === null || post === void 0 ? void 0 : post.title, content: post === null || post === void 0 ? void 0 : post.content };
    });
    const result = yield __1.prisma.user.create({
        data: {
            name,
            email,
            password,
            posts: {
                create: postData,
            },
        },
    });
    res.json(result);
});
exports.signupController = signupController;
