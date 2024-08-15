import { PrismaClient } from "@prisma/client/extension"
import { Context, Hono } from "hono"
import { userAuthMiddleware } from "../middlewares/auth"
import { GOOGLE_API_KEY, SEARCH_ENGINE_ID } from "../utils/constant"


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
    console.log(userId, "userr id");

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

postRouter.get("/search/global", userAuthMiddleware, async (c: Context) => {
  try {
    const query = c.req.query("q");
    const startIndex = c.req.query("startIndex")
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&start=${startIndex}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    c.status(200);
    return c.json({ message: "Global Search result fetched Successfully", details: data, success: "ok" })
  } catch (error: any) {
    c.status(500);
    return c.json({ message: "caught an error", error: error.message })
  }
})

postRouter.get("/search", userAuthMiddleware, async (c: Context) => {
  try {
    const prisma = c.get("prisma");
    const query = c.req.query("q");
    const response = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive", // Makes the search case-insensitive
            },
          },
          {
            author: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      select: {
        title: true,
        content: true,
        author: true,
        id: true,
      }
    })
    c.status(200)
    return c.json({ message: "blogs fetched successfully", details: response })
  } catch (error: any) {
    c.status(500)
    return c.json({ message: "got an error", error: error.message })
  }
})

postRouter.get("/:blogid/iseditable", userAuthMiddleware, async (c: Context) => {
  try {
    const prisma = c.get("prisma");
    const { blogid } = c.req.param();

    const response = await prisma.post.findFirst({
      where: {
        id: blogid,
        authorId: c.get('id')
      }
    })
    c.status(200);
    let isEditable = false;
    if (response.title) {
      isEditable = true;
    }
    return c.json({ message: "blog is editable", isEditable: isEditable, details: response });
  } catch (e: any) {
    return c.json({ message: "caught an error", isEditable: false, error: e.message })
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

postRouter.delete("/:blogId", userAuthMiddleware, async (c: Context) => {
  try {
    const prisma = c.get('prisma');
    const { blogId } = c.req.param();
    const response = await prisma.post.delete({
      where: {
        id: blogId,
        authorId: c.get("id")
      }
    })
    c.status(200);
    return c.json({ message: "blog deleted successfully", details: response })
  } catch (err: any) {
    c.status(500);
    return c.json({ message: "something went wrong", details: err.message });
  }
})

postRouter.get('/bulk', userAuthMiddleware, async (c: Context) => {

  try {

    const prisma = c.get('prisma')
    const cursor = c.req.query("cursor");
    const skip = cursor ? parseInt(cursor) : 0
    const take = 6;
    const response = await prisma.post.findMany({
      skip: skip,
      take: take,
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
    const nextCursor = skip + take;
    return c.json({ message: "blog got successfully", details: response, nextCursor: response.length === take ? nextCursor : undefined })
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
        id: blogId,
        // authorId: c.get('id')
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
