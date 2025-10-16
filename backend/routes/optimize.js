import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  const { asin, title, bullets, description } = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  if (!asin || !title || !bullets || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const prompt = `
You are an Amazon product listing optimization expert.
Given the following product details:
- Title: ${title}
- Bullet Points: ${bullets}
- Description: ${description}

Generate:
1. An improved, keyword-rich, readable title.
2. 5 rewritten bullet points that are clear and concise.
3. An enhanced, persuasive but compliant description.
4. 3 to 5 new keyword suggestions.

Give output strictly in valid JSON format only (no markdown, no explanations, no backticks).
Example:
{
  "optimized_title": "...",
  "optimized_bullets": ["...", "..."],
  "optimized_description": "...",
  "keywords": ["...", "..."]
}
`;

  try {
    const ans = await model.generateContent(prompt);
    let text = ans.response.text().trim();

    // Clean any unwanted formatting if model adds markdown
    text = text.replace(/```json|```/g, "").trim();

    let result;
    try {
      result = JSON.parse(text);
    } catch (parseErr) {
      console.error("Failed to parse AI response:", text);
      throw new Error("Invalid JSON format returned by AI");
    }

    // Save optimized result to DB
    await db.query(
      `INSERT INTO asin_optimizations 
        (asin, original_title, original_bullets, original_description,
         optimized_title, optimized_bullets, optimized_description, keywords)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        asin,
        title,
        bullets,
        description,
        result.optimized_title,
        result.optimized_bullets.join("\n"),
        result.optimized_description,
        result.keywords.join(", "),
      ]
    );

    res.json(result);
  } catch (error) {
    console.error("Error during optimization:", error.response?.data || error.message || error);
    res.status(500).json({ error: "AI optimization failed" });
  }
});

export default router;
