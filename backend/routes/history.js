import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Utility to safely parse JSON, fallback to array
const safeParseArray = (str) => {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    if (Array.isArray(parsed)) return parsed;
    return [parsed];
  } catch {
    // fallback: try splitting by newline if it's a string
    return str.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  }
};

// GET all optimization history
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM asin_optimizations ORDER BY created_at DESC"
    );

    const parsedRows = rows.map((row) => ({
      ...row,
      original_bullets: safeParseArray(row.original_bullets),
      optimized_bullets: safeParseArray(row.optimized_bullets),
      keywords: safeParseArray(row.keywords),
    }));

    res.json(parsedRows);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch optimization history" });
  }
});

export default router;
