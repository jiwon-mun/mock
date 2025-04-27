import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false, // 인증서 무시, 필요에 따라 true로 설정 가능 (production 환경에서는 true로 설정)
  },
});
