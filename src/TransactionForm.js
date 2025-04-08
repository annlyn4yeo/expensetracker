import { useState } from "react";

export const TransactionForm = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount) return;

    const newTransaction = {
      id: crypto.randomUUID(), // unique id for future use
      description,
      amount: parseFloat(amount),
    };

    onAdd(newTransaction);

    // Reset form
    setDescription("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-4 mb-6"
    >
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
          placeholder="e.g. 100 or -50"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Add Transaction
      </button>
    </form>
  );
};
