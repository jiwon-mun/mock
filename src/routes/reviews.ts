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
        modified_at,
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
        email_id,
        image_url,
        profile_options,
        is_validated,
        is_ggom_event,
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
        modified_at: r.modified_at,
        pros: r.pros,
        cons: r.cons,
        tip: r.tip,
        rating: r.rating,
        is_recommended: r.is_recommended,
        product: {
          id: r.product_id,
          name: r.product_name,
          image: r.product_image,
          brand: {
            id: r.brand_id,
            name: r.brand_name,
          },
        },
        user: {
          id: r.user_id,
          nickname: r.nickname,
          email_id: r.email_id,
          image_url: r.image_url,
          profile_options: r.profile_options,
          is_validated: r.is_validated,
          is_ggom_event: r.is_ggom_event,
        },
        tags: r.tags,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching reviews");
  }
});

// curl -X POST "http://localhost:5432/reviews" \
//   -H "Content-Type: application/json" \
//   -d '{
//     "pros": "Great product, works well and lasts a long time.",
//     "cons": "A bit expensive, but worth the price.",
//     "tip": "Use it regularly for best results.",
//     "rating": 4,
//     "is_recommended": true,
//     "product_id": 123,
//     "product_name": "Super Product",
//     "product_image": "https://placehold.co/180x180/blue/white",
//     "brand_id": 789,
//     "brand_name": "SuperBrand",
//     "user_id": 456,
//     "nickname": "john_doe",
//     "email_id": "john.doe@example.com",
//     "image_url": "https://placehold.co/100x100/green/white",
//     "profile_options": ["US", "30s", "SensitiveSkin"],
//     "is_validated": true,
//     "is_ggom_event": false,
//     "tags": ["Tag1", "Tag2"]
//   }'

router.post("/", async (req: Request, res: Response): Promise<any> => {
  console.log("req.body::", req.body);
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
    email_id,
    image_url,
    profile_options,
    is_validated,
    is_ggom_event,
    tags,
  } = req.body;

  console.log("req.body::", req.body);

  if (!pros || !cons || !rating || !product_id || !user_id || !nickname) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const result = await db.query(
      `
      INSERT INTO reviews (
        pros, cons, tip, rating, is_recommended, 
        product_id, product_name, product_image, brand_id, brand_name, 
        user_id, nickname, email_id, image_url, profile_options, 
        is_validated, is_ggom_event, tags
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
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
        email_id,
        image_url,
        profile_options,
        is_validated,
        is_ggom_event,
        tags,
      ]
    );

    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating review");
  }
});

export default router;
