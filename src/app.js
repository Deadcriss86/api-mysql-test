import express from "express";
import dataRoutes from "./routes/datas.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import indexRoutes from "./routes/index.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use(indexRoutes);
app.use("/api/", dataRoutes, blogRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "enpoint not found",
  });
});

export default app;
