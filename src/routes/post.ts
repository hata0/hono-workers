import { Hono } from "hono";
import { PostHandler } from "../handlers/post";

const postApi = new Hono();

const postHandler = new PostHandler();

postApi.get("/:id", (c) => postHandler.get(c));
postApi.get("/", (c) => postHandler.list(c));

export { postApi };
