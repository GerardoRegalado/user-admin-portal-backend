import express from "express";
import { getUsers, loginUser, registerUser } from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);


export default router;
