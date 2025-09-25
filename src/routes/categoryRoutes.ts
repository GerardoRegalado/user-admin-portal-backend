import express from "express";
import { createCategory, getCategories, updateCategory } from "../controllers/categoryController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", authenticateToken, updateCategory);

export default router;
