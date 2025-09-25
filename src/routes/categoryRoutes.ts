import express from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categoryController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", authenticateToken, updateCategory);
router.delete("/:id", authenticateToken, deleteCategory);
router.get("/:id", getCategoryById);
export default router;
