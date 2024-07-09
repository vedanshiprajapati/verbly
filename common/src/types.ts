import { z } from "zod"

export const signupInput = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least $ characters'),
    username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username can be only upto 30 characters').transform(username => username.trim().toLowerCase()),
    name: z.string().optional()
})

export const signinInput = z.object({
    password: z.string().min(6, 'Password must be at least $ characters'),
    username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username can be only upto 30 characters').transform(username => username.trim().toLowerCase())
})

export const createBlogInput = z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.object({
        username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username can be only upto 30 characters').transform(username => username.trim().toLowerCase()),
        name: z.string().optional()
    }),
    contentFormat: z.string().optional(),
    content: z.string().min(1, 'Content is required'),
})

export type signup = z.infer<typeof signupInput>
export type signin = z.infer<typeof signinInput>
export type createBlog = z.infer<typeof createBlogInput>