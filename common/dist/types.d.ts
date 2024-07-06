import { z } from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    username: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    username: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    username: string;
    name?: string | undefined;
}>;
export declare const signinInput: z.ZodObject<{
    password: z.ZodString;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    username: string;
}, {
    password: string;
    username: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    author: z.ZodObject<{
        username: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        username: string;
        name?: string | undefined;
    }, {
        username: string;
        name?: string | undefined;
    }>;
    contentFormat: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    author: {
        username: string;
        name?: string | undefined;
    };
    content: string;
    contentFormat?: string | undefined;
}, {
    title: string;
    author: {
        username: string;
        name?: string | undefined;
    };
    content: string;
    contentFormat?: string | undefined;
}>;
export type signup = z.infer<typeof signupInput>;
export type signin = z.infer<typeof signinInput>;
export type createBlog = z.infer<typeof createBlogInput>;
