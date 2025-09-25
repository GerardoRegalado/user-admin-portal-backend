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

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(3000, () => console.log("Server running http://localhost:3000"));
  })
  .catch(err => console.error("Error connecting with MongoDB:", err));
