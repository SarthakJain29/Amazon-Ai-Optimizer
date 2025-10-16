//This route lets us view all past optimization records stored in the MySQL database

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

    res.json(rows);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch optimization history" });
  }
});

export default router;
