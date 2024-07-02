import { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

type Env = {
  Variables: {
    echo: (str: string) => string,
    username: string,
    id: string
  }
}

export const userAuthMiddleware = createMiddleware<Env>(async (c: Context, next) => {
  console.log("in middleware")
  try {
    const header = c.req.header('authorization');
    if (header) {
      const token = header.split(' ')[1].trim();
      const response = await verify(token, c.env.JWT_SECRET);
      console.log(response)
      console.log(response)
      const { id, username } = response
      c.set('username', username);
      c.set('id', id);
      await next();
    } else {
      return c.json({ message: "authorization header is not correct", header: header })
    }

  } catch (err: any) {
    return c.json({ message: "error in the middleware", error: err.message })
  }
})