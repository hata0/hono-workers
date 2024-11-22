import type { Context } from "hono";
import { getPostHandler, listPostHandler } from "../handlers/post";

export const getPostController = (c: Context) => {
  const result = getPostHandler();

  return c.json(result, 200);
};

export const listPostController = (c: Context) => {
  const result = listPostHandler();

  return c.json(result, 200);
};
