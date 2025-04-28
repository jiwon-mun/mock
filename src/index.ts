import express from "express";
import dotenv from "dotenv";
import reviewsRouter from "./routes/reviews";
import reportsRouter from "./routes/reports";
import { initDB } from "./db/init";
import cors from "cors";

dotenv.config();

(async () => {
  await initDB(); // 테이블 먼저 준비

  // CORS 미들웨어 사용 (모든 도메인 허용)

  const app = express();

  const port = process.env.PORT || 3000;
  app.use(cors());
  // app.use(express.json()); // JSON 형태의 body를 파싱
  // app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded 형태의 body를 파싱

  app.use(express.json());

  // 유저 관련 API 등록
  app.use("/reviews", reviewsRouter);
  app.use("/report-reasons", reportsRouter);
  app.get("/", (req, res) => {
    res.send("Hello from Node.js + PostgreSQL + TypeScript API Server!");
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
