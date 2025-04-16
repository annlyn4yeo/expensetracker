import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import {
  createTransaction,
  getUserTransactions,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createTransaction)
  .get(protect, getUserTransactions);

router.route("/:id").delete(protect, deleteTransaction);

export default router;
