import express from "express";
import { db } from "../db.js";

const router = express.Router();

// GET all optimization history
router.get("/", async (req, res) => {
  try {
    // Fetch all stored optimizations from MySQL
    const [rows] = await db.query(
      "SELECT * FROM asin_optimizations ORDER BY created_at DESC"
    );

    // Parse JSON strings back into arrays
    const parsedRows = rows.map((row) => ({
      ...row,
      original_bullets: row.original_bullets ? JSON.parse(row.original_bullets) : [],
      optimized_bullets: row.optimized_bullets ? JSON.parse(row.optimized_bullets) : [],
      keywords: row.keywords ? JSON.parse(row.keywords) : [],
    }));

    res.json(parsedRows);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch optimization history" });
  }
});

export default router;
