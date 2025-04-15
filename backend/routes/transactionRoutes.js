import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import {
  createTransaction,
  getUserTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createTransaction)
  .get(protect, getUserTransactions);

export default router;
