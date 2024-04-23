import { Router } from "express";
import {
  getDataBlog,
  updateDataBlog,
  DeleteDataBlog,
  CreateDataBlog,
  getBlogsWithAuthors,
} from "../controllers/blog.controller.js";

const router = Router();

router.get("/Blog", getBlogsWithAuthors);

router.get("/Blog/:id", getDataBlog);

router.post("/Blog", CreateDataBlog);

router.patch("/Blog/:id", updateDataBlog);

router.delete("/Blog/:id", DeleteDataBlog);

export default router;
