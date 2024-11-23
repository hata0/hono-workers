import type { Context } from "hono";
import { DBClient } from "../client";

export class PostHandler {
  async list(c: Context) {
    const { limit, page, sort } = await c.req.json();

    const prisma = new DBClient(c);

    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let tasks;
    if (sort === "latest") {
      tasks = await prisma.post.findMany({
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: "desc" },
      });
    } else if (sort === "oldest") {
      tasks = await prisma.post.findMany({
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: "asc" },
      });
    }

    const totalCount = await prisma.post.count();
    const totalPage = Math.ceil(totalCount / limit);

    return c.json(
      {
        tasks,
        pagination: {
          currentPage: page,
          totalPage,
          totalCount,
        },
      },
      200,
    );
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

  async deleteMany(c: Context) {
    const body = await c.req.json();

    const prisma = new DBClient(c);
    await prisma.post.deleteMany({
      where: {
        id: { in: body },
      },
    });

    return c.json({ message: "success" }, 200);
  }
}
