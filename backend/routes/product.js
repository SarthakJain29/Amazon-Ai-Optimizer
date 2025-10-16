import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { db } from "../db.js";

const router = express.Router();

// Fetch product details by ASIN
router.get("/:asin", async (req, res) => {
  const { asin } = req.params;   
  const url = `https://www.amazon.in/dp/${asin}`; //forming the amazon url with asin

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },  //adding headers to avoid getting request blocked by amazon
    });

    const $ = cheerio.load(data);

    const title = $("#productTitle").text().trim();
    const bullets = $("#feature-bullets li span")
      .map((i, el) => $(el).text().trim())
      .get()
      .filter(Boolean)
      .join("\n");

    const description = $("#productDescription").text().trim();

    res.json({
      asin,
      title,
      bullets,
      description,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});

export default router;
