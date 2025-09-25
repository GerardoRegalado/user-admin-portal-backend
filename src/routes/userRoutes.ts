import express from "express";
import { deleteUser, getUserById, getUsers, loginUser, registerUser, updateUser } from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);

//(Protected routes)
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);
router.get("/:id", authenticateToken, getUserById)

export default router;
