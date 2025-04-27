import express from "express";
import dotenv from "dotenv";
import reviewsRouter from "./routes/reviews";
import { initDB } from "./db/init";

dotenv.config();

(async () => {
  await initDB(); // 테이블 먼저 준비

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  // 유저 관련 API 등록
  app.use("/reviews", reviewsRouter);

  app.get("/", (req, res) => {
    res.send("Hello from Node.js + PostgreSQL + TypeScript API Server!");
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
