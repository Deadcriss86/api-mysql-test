import { Router } from "express";
import {
  getData,
  getDatas,
  CreateData,
  updateData,
  DeleteData,
} from "../controllers/data.controller.js";
const router = Router();

router.get("/data", getDatas);

router.get("/data/:id", getData);

router.post("/data", CreateData);

router.patch("/data/:id", updateData);

router.delete("/data/:id", DeleteData);

export default router;
