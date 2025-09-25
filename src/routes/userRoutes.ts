import express from "express";
import { getUsers, loginUser, registerUser, updateUser } from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);

// UPDATE por id (protegido)
router.put("/:id", authenticateToken, updateUser);


export default router;
