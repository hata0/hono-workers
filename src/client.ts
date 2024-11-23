import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
import { Pool } from "pg";

export class DBClient extends PrismaClient {
  constructor(c: Context) {
    const connectionString = `${c.env?.DATABASE_URL ?? ""}`;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }
}
