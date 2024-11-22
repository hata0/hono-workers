import { Hono } from "hono";
import { getPostController, listPostController } from "../controllers/post";

const postApi = new Hono();

postApi.get("/", (c) => listPostController(c));
postApi.get("/:id", (c) => getPostController(c));

export { postApi };
