import { PrismaClient } from "@prisma/client/extension"
import { Context, Hono } from "hono"
import { hashPassword, verifyPassword } from "../utils/passwordEncryption"
import { sign } from "hono/jwt"
import { signupInput } from "@vedanshi/verbly-common"


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
      prisma: PrismaClient
    }
}>()

userRouter.post('/signup', async (c: Context) => {
    try {
      const prisma = c.get('prisma')
      const body = await c.req.json();   
       const { success } = signupInput.safeParse(body)

      if (!success) {
        c.status(411);
        return c.json({message:"your inputs are invalid"})
      }
      const hashedPassword = await hashPassword(body.password);
  
      const response = await prisma.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          username: body.username,
        }
      })
    
      const { id, username } = response;
      const token:string = await sign({ id, username }, c.env.JWT_SECRET);
      
      c.status(200)
  
      return c.json({ message: "mission of signing Up is successfull, Roger", token: token })
  
    } catch (err:any) {
      c.status(404)
      return c.json({message:"Oops!, caught an error", error:err.message})
    }
})
   

userRouter.post('/signin', async (c: Context) => {
    try {
      const prisma = c.get('prisma');
      const body = await c.req.json();
      const response = await prisma.user.findFirst({
        where: {
          username: body.username,
        }
      });
      if (response) {
        const match = await verifyPassword(body.password, response.password);
        if (!match) {
           return c.json({message: "password is incorrect"})
        }
        const { id, username } = response;
        
        const jwt = await sign({ id, username }, c.env.JWT_SECRET);
        c.status(200)
        return c.json({ message: "signing in successful", token: jwt });
      } else {
        return c.json({ message: "user doesn't exist" });
      }
    } catch (e: any) { 
      c.status(404)
      return c.json({message:"Oops!, caught an error", error:e.message})
    }
  
  })