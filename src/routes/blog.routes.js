import { Router } from "express";
import {
  getDataBlog,
  getDatasBlog,
  updateDataBlog,
  DeleteDataBlog,
  CreateDataBlog,
} from "../controllers/blog.controller.js";

const router = Router();

router.get("/Blog", getDatasBlog);

router.get("/Blog/:id", getDataBlog);

router.post("/Blog", CreateDataBlog);

router.patch("/Blog/:id", updateDataBlog);

router.delete("/Blog/:id", DeleteDataBlog);

export default router;
