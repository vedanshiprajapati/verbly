import { Context, Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
    prisma: PrismaClient
  }
}>()
app.use('*', cors());
app.use('*', async (c: Context, next) => {
  const prisma = await new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set('prisma', prisma);
  await next();
})

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', postRouter)

app.get('/api/v1', (c) => {
  return c.text("hello! this is the api of verbly")
})
app.get('/', (c) => {
  return c.text("hello! mainnnn")
})

export default app
