import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
import { Pool } from "pg";

export class PostHandler {
  get(c: Context) {
    const result = {
      name: "foo",
      title: "Sample post 1",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum feugiat nunc, id elementum nulla venenatis ut. Praesent non nunc ultrices, consequat arcu sit amet, auctor lacus. Maecenas libero sem, tincidunt ut sapien quis, elementum vehicula augue. Cras non cursus nulla. Suspendisse congue posuere accumsan. Vivamus ut sollicitudin ligula. In viverra tellus vel porttitor feugiat. Ut bibendum turpis sed mauris egestas ultricies.",
    };

    return c.json(result, 200);
  }

  async list(c: Context) {
    const connectionString = `${c.env?.DATABASE_URL ?? ""}`;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const result = await prisma.post.findMany();

    return c.json(result, 200);
  }
}
