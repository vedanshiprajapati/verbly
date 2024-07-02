import { PrismaClient } from "@prisma/client/extension"
import { Context, Hono } from "hono"
import { userAuthMiddleware } from "../middlewares/auth"


export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
    prisma: PrismaClient
  }
}>()

postRouter.post('/edit', userAuthMiddleware, async (c: Context) => {
  try {
    const prisma = c.get('prisma')
    const body = await c.req.json();
    const { title, content } = body;
    const userId = c.get('id');
    console.log(userId);

    const response = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: userId,
        published: true,
      }
    })

    c.status(200);
    return c.json({ message: "blog is published", details: response })
  } catch (e: any) {
    c.status(500);
    return c.json({ message: "blog is not published due to error", details: e.message })
  }

})

postRouter.put('/:blogId', userAuthMiddleware, async (c: Context) => {
  try {
    const prisma = c.get('prisma')
    const { blogId } = c.req.param();
    const body = await c.req.json();
    const response = await prisma.post.update({
      where: {
        id: blogId,
        authorId: c.get('id')
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      }
    })
    c.status(200);
    return c.json({ message: "blog updated successfully", details: response })
  } catch (e: any) {
    return c.json({ message: "caught an error", error: e.message })
  }

})

postRouter.get('/bulk', userAuthMiddleware, async (c: Context) => {

  try {

    const prisma = c.get('prisma')

    const response = await prisma.post.findMany({
      where: {
      },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            username: true,
            name: true,
          },
        },
        published: true,
      }

    })

    c.status(200);
    return c.json({ message: "blog got successfully", details: response })
  } catch (e) {
    return c.json({ message: "caught an error", error: e })
  }
})

postRouter.get('/:blogId', userAuthMiddleware, async (c: Context) => {
  try {
    const prisma = c.get('prisma')
    const { blogId } = c.req.param();
    const response = await prisma.post.findFirst({
      where: {
        authorId: c.get('id')
      }
    })
    c.status(200);
    return c.json({ message: "blog got successfully", details: response })
  } catch (e) {
    return c.json({ message: "caught an error", error: e })
  }
})