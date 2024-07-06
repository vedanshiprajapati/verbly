import { z } from "zod"

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().min(3).max(30),
    name: z.string().optional()
})

export const signinInput = z.object({
    password: z.string().min(6),
    username: z.string().min(3).max(30)
})

export const createBlogInput = z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.object({
        username: z.string().min(3).max(30),
        name: z.string().optional()
    }),
    contentFormat: z.string().optional(),
    content: z.string().min(1, 'Content is required'),
})

export type signup = z.infer<typeof signupInput>
export type signin = z.infer<typeof signinInput>
export type createBlog = z.infer<typeof createBlogInput>