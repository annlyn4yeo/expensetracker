import { Transaction } from "../models/transaction.js";

export const createTransaction = async (req, res) => {
  try {
    const { type, amount, description, date } = req.body;

    const transaction = new Transaction({
      user: req.user._id,
      type,
      amount,
      description,
      date,
    });

    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to add transaction." });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions." });
  }
};
