"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    username: zod_1.z.string().min(3).max(30),
    name: zod_1.z.string().optional()
});
exports.signinInput = zod_1.z.object({
    password: zod_1.z.string().min(6),
    username: zod_1.z.string().min(3).max(30)
});
exports.createBlogInput = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    author: zod_1.z.object({
        username: zod_1.z.string().min(3).max(30),
        name: zod_1.z.string().optional()
    }),
    contentFormat: zod_1.z.string().optional(),
    content: zod_1.z.string().min(1, 'Content is required'),
});
