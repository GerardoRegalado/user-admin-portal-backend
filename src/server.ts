import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";


dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Server Running OK.");
});
// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));  })
  .catch(err => console.error("Error connecting with MongoDB:", err));
