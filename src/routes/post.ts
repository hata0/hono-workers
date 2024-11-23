import { Hono } from "hono";
import { PostHandler } from "../handlers/post";

const postApi = new Hono();

const postHandler = new PostHandler();

postApi.get("/", (c) => postHandler.list(c));
postApi.get("/:id", (c) => postHandler.get(c));
postApi.post("/", (c) => postHandler.create(c));
postApi.put("/:id", (c) => postHandler.update(c));
postApi.delete("/:id", (c) => postHandler.delete(c));
postApi.delete("/", (c) => postHandler.deleteMany(c));

export { postApi };
