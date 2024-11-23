import type { Context } from "hono";
import { DBClient } from "../client";

export class PostHandler {
  async list(c: Context) {
    const prisma = new DBClient(c);
    const data = await prisma.post.findMany();

    return c.json(data, 200);
  }

  async get(c: Context) {
    const id = c.req.param("id");

    const prisma = new DBClient(c);
    const data = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    return c.json(data, 200);
  }

  async create(c: Context) {
    const body = await c.req.json();

    const prisma = new DBClient(c);
    const data = await prisma.post.create({
      data: body,
    });

    return c.json(data, 200);
  }

  async update(c: Context) {
    const body = await c.req.json();

    const id = c.req.param("id");

    const prisma = new DBClient(c);
    const data = await prisma.post.update({
      where: { id },
      data: body,
    });

    return c.json(data, 200);
  }

  async delete(c: Context) {
    const id = c.req.param("id");

    const prisma = new DBClient(c);
    await prisma.post.delete({
      where: { id },
    });

    return c.json({ message: "success" }, 200);
  }
}
