import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productRoutes from "./routes/product.js";
import optimizeRoutes from "./routes/optimize.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/product", productRoutes);
app.use("/api/optimize", optimizeRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
