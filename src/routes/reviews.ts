import { Router, Request, Response } from "express";
import { db } from "../db/db";

const router = Router();

// GET /reviews
// /reviews?user_id=1&product_id=2&limit=5&offset=0
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const { user_id, product_id, limit = "10", offset = "0" } = req.query;

  const queryParts: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (user_id) {
    queryParts.push(`user_id = $${paramIndex++}`);
    params.push(user_id);
  }
  if (product_id) {
    queryParts.push(`product_id = $${paramIndex++}`);
    params.push(product_id);
  }

  const whereClause =
    queryParts.length > 0 ? `WHERE ${queryParts.join(" AND ")}` : "";

  try {
    const reviews = await db.query(
      `
      SELECT
        id,
        created_at,
        pros,
        cons,
        tip,
        rating,
        is_recommended,
        product_id,
        product_name,
        product_image,
        brand_name,
        user_id,
        nickname,
        tags
      FROM reviews
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex++}
      OFFSET $${paramIndex++}
    `,
      [...params, limit, offset]
    );

    res.json(
      reviews.rows.map((r) => ({
        id: r.id,
        created_at: r.created_at,
        pros: r.pros,
        cons: r.cons,
        tip: r.tip,
        rating: r.rating,
        is_recommended: r.is_recommended,
        product: {
          id: r.product_id,
          name: r.product_name,
          image: r.product_image,
        },
        brand: {
          id: r.brand_id,
          name: r.brand_name,
        },
        user: {
          id: r.user_id,
          nickname: r.nickname,
        },
        tags: r.tags,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching reviews");
  }
});

// POST /reviews
// curl -X POST http://localhost:5432/reviews \
//   -H "Content-Type: application/json" \
//   -d '{
//     "pros": "Great product, works well.",
//     "cons": "A bit pricey.",
//     "tip": "Use it regularly for best results.",
//     "rating": 4,
//     "is_recommended": true,
//     "product_id": 123,
//     "user_id": 456,
//     "nickname": "john_doe",
//     "tags": ["US", "30s", "SensitiveSkin"]
//   }'
router.post("/", async (req: Request, res: Response): Promise<any> => {
  const {
    pros,
    cons,
    tip,
    rating,
    is_recommended,
    product_id,
    product_name,
    product_image,
    brand_id,
    brand_name,
    user_id,
    nickname,
    tags,
  } = req.body;

  // 필수 파라미터 검사
  if (
    !pros ||
    !cons ||
    !rating ||
    !product_id ||
    !user_id ||
    !nickname ||
    !product_name ||
    !product_image ||
    !brand_id ||
    !brand_name
  ) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const result = await db.query(
      `
      INSERT INTO reviews (pros, cons, tip, rating, is_recommended, product_id, product_name, product_image, brand_id, brand_name, user_id, nickname, tags)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id
    `,
      [
        pros,
        cons,
        tip,
        rating,
        is_recommended,
        product_id,
        product_name,
        product_image,
        brand_id,
        brand_name,
        user_id,
        nickname,
        tags,
      ]
    );

    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating review");
  }
});

// curl -X POST "http://localhost:5432/reviews" \
//   -H "Content-Type: application/json" \
//   -d '{
//     "pros": "Great product, works well.",
//     "cons": "A bit pricey.",
//     "tip": "Use it regularly for best results.",
//     "rating": 4,
//     "is_recommended": true,
//     "product_id": 123,
//     "product_name": "Super Product",
//     "product_image": "https://placehold.co/180x180/orange/white",
//     "brand_id": 789,
//     "brand_name": "SuperBrand",
//     "user_id": 456,
//     "nickname": "john_doe",
//     "tags": ["US", "30s", "SensitiveSkin"]
//   }'

export default router;
