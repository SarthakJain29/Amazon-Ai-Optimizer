import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/product", productRoutes);

app.listen(5000, () => console.log("✅ Server running on port 5000"));
