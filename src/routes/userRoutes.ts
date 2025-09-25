import express from "express";
import { deleteUser, getUsers, loginUser, registerUser, updateUser } from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);

//(protegido)
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);


export default router;
