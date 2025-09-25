import express from "express";
import { createProduct, getProducts, updateProduct } from "../controllers/productController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", authenticateToken, updateProduct);


export default router;
