import express, { Request, Response } from "express";
import { db } from "../db/db";

const router = express.Router();

// region 매핑 로직
const getRegionFromLanguage = (language: string | undefined) => {
  if (!language) return "US"; // 기본값
  if (language.toLowerCase().startsWith("ja")) return "JA";
  return "US";
};

router.get("/", async (req: Request, res: Response) => {
  const acceptLanguage = req.headers["accept-language"];
  const region = getRegionFromLanguage(
    Array.isArray(acceptLanguage) ? acceptLanguage[0] : acceptLanguage
  );

  try {
    const result = await db.query(
      `
      SELECT id, reason
      FROM report_reasons
      WHERE region = $1
      ORDER BY id ASC
      `,
      [region]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching report reasons:", error);
    res.status(500).send("Error fetching report reasons");
  }
});

export default router;
