import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productRoutes from "./routes/product.js";
import optimizeRoutes from "./routes/optimize.js";
import historyRoutes from "./routes/history.js";

const app = express();

//middlewares
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(bodyParser.json());

//routes
app.use("/api/product", productRoutes);
app.use("/api/optimize", optimizeRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {  //test route
  res.send("API is running...");
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
