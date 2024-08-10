import { PrismaClient } from "@prisma/client/extension"
import { Context, Hono } from "hono"
import { hashPassword, verifyPassword } from "../utils/passwordEncryption"
import { sign } from "hono/jwt"
import { signupInput } from "@vedanshi/verbly-common"
import { userAuthMiddleware } from "../middlewares/auth"


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
      return c.json({ message: "your inputs are invalid" })
    }
    const hashedPassword = await hashPassword(body.password);

    const response = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        username: body.username,
        name: body?.name
      }
    })

    const { id, username } = response;
    const token: string = await sign({ id, username }, c.env.JWT_SECRET);

    c.status(200)

    return c.json({ message: "mission of signing Up is successfull, Roger", token: token })

  } catch (err: any) {
    console.log(typeof err);
    c.status(404)
    return c.json({ message: "Oops!, caught an error", error: err.message })
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
        return c.json({ message: "password is incorrect" })
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
    return c.json({ message: "Oops!, caught an error", error: e.message })
  }

})

userRouter.get("/:username", userAuthMiddleware, async (c: Context) => {
  try {
    const { username } = c.req.param()
    const prisma = c.get("prisma");
    const response = await prisma.user.findFirst({
      where: {
        username: username,
      },
      select: {
        email: true,
        username: true,
        name: true,
        id: true,
        posts: true
      }
    })
    c.status(200);
    return c.json({ message: "user details sent successfully", details: response, success: "OK" })
  } catch (error: any) {
    c.status(500);
    return c.json({ message: "something is wrong", error: error.message });
  }
})

userRouter.put("/profile/edit", userAuthMiddleware, async (c: Context) => {
  try {
    const userId = c.get("id");
    const body = await c.req.json();
    const prisma = c.get("prisma");
    const response = await prisma.user.update({
      where: { id: userId },
      data: {
        email: body?.email,
        name: body?.name,
        username: body?.username
      },
    });
    c.status(200);
    return c.json({ message: "Profile updated successfully", details: response });
  } catch (error: any) {
    c.status(500);
    return c.json({ message: "Something went wrong", error: error.message });
  }
});
