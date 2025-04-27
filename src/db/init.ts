import { db } from "./db";

export const initDB = async () => {
  try {
    await db.query(`
        CREATE TABLE IF NOT EXISTS reviews (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          modified_at TIMESTAMP NOT NULL DEFAULT NOW(),
          pros TEXT NOT NULL,
          cons TEXT NOT NULL,
          tip TEXT,
          rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
          is_recommended BOOLEAN NOT NULL,
          product_id INTEGER NOT NULL,
          user_id INTEGER NOT NULL,
          nickname TEXT NOT NULL,
          tags TEXT[]
        )
    `);

    // 인덱스 생성
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews (product_id);
    `);

    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews (user_id);
    `);

    console.log("✅ Reviews table is ready");
  } catch (error) {
    console.error("❌ Error creating reviews table", error);
    throw error;
  }
};
