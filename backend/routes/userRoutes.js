import express from "express";
import { registerUser } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleWare.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/getUsers", protect, adminOnly, getAllUsers);
router.post("/register", registerUser);

export default router;
