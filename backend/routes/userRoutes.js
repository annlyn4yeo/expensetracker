import express from "express";
import {
  registerUser,
  getAllUsers,
  loginUser,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.get("/getUsers", protect, adminOnly, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
