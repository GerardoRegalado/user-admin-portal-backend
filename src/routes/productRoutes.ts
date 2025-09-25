import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController";
import { authenticateToken } from "../middleware/auth";
import { deleteCategory } from "../controllers/categoryController";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

router.get("/:id", getProductById); 

export default router;
