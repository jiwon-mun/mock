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
        modified_at: r.modified_at,
        pros: r.pros,
        cons: r.cons,
        tip: r.tip,
        rating: r.rating,
        is_recommended: r.is_recommended,
        product: {
          id: r.product_id,
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

router.post("/", async (req: Request, res: Response): Promise<any> => {
  console.log("req.body::", req.body);
  const {
    pros,
    cons,
    tip,
    rating,
    is_recommended,
    product_id,
    user_id,
    nickname,
    tags,
  } = req.body;

  if (!pros || !cons || !rating || !product_id || !user_id || !nickname) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const result = await db.query(
      `
      INSERT INTO reviews (pros, cons, tip, rating, is_recommended, product_id, user_id, nickname, tags)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `,
      [
        pros,
        cons,
        tip,
        rating,
        is_recommended,
        product_id,
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

// DELETE /reviews/:id
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const result = await db.query("DELETE FROM reviews WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).send("Review not found");
    }
    res.status(204).send(); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting review");
  }
});

export default router;
