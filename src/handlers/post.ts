import { Prisma } from "@prisma/client";
import type { Context } from "hono";
import { fromPromise } from "neverthrow";
import { DBClient } from "../client";

export class PostHandler {
  async list(c: Context) {
    const { limit, page, sort } = await c.req.json();

    const prisma = new DBClient(c);

    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let tasks;
    if (sort === "oldest") {
      tasks = await prisma.post.findMany({
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: "asc" },
      });
    } else {
      tasks = await prisma.post.findMany({
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: "desc" },
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
    const task = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    return c.json({ task }, 200);
  }

  async create(c: Context) {
    const body = await c.req.json();

    const prisma = new DBClient(c);
    const task = await prisma.post.create({
      data: body,
    });

    return c.json({ task }, 200);
  }

  async update(c: Context) {
    const body = await c.req.json();

    const id = c.req.param("id");

    const prisma = new DBClient(c);
    const res = await fromPromise(
      prisma.post.update({
        where: { id },
        data: body,
      }),
      (e) => e,
    );

    if (res.isErr()) {
      if (res.error instanceof Prisma.PrismaClientKnownRequestError && res.error.code === "P2025") {
        return c.json({ message: "record to update not found" }, 400);
      }
      return c.json({ message: "unexpected error" }, 500);
    }

    return c.json({ task: res.value }, 200);
  }

  async delete(c: Context) {
    const id = c.req.param("id");

    const prisma = new DBClient(c);
    const res = await fromPromise(
      prisma.post.delete({
        where: { id },
      }),
      (e) => e,
    );

    if (res.isErr()) {
      if (res.error instanceof Prisma.PrismaClientKnownRequestError && res.error.code === "P2025") {
        return c.json({ message: "record to delete does not exist" }, 400);
      }
      return c.json({ message: "unexpected error" }, 500);
    }

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
