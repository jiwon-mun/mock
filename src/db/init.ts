import { db } from "./db";

export const initDB = async () => {
  try {
    // await db.query(`DROP TABLE IF EXISTS reviews;`);

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
        product_name TEXT NOT NULL,
        product_image TEXT NOT NULL,
        brand_id INTEGER NOT NULL,
        brand_name TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        nickname TEXT NOT NULL,
        email_id TEXT NOT NULL,  -- email_id 추가
        image_url TEXT NOT NULL, -- image_url 추가
        profile_options TEXT[],  -- tags -> profile_options로 변경
        is_validated BOOLEAN NOT NULL, -- is_validated 추가
        is_ggom_event BOOLEAN NOT NULL, -- is_ggom_event 추가
        tags TEXT[] -- 기존의 tags는 그대로 유지
      );
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
