import { useState } from "react";

export const TransactionForm = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (isExpense) => {
    if (!description || !amount) return;

    const signedAmount = isExpense
      ? -Math.abs(parseFloat(amount))
      : Math.abs(parseFloat(amount));

    const newTransaction = {
      id: crypto.randomUUID(),
      description,
      amount: signedAmount,
    };

    onAdd(newTransaction);

    // Reset form
    setDescription("");
    setAmount("");
  };

  return (
    <form className="bg-white shadow-md rounded-xl p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Add Transaction
      </h2>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Salary, Groceries"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 100"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => handleSubmit(false)} // Income
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200 cursor-pointer"
          aria-label="Add Income"
        >
          Add Income
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(true)} // Expense
          className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200 cursor-pointer"
          aria-label="Add Expense"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};
