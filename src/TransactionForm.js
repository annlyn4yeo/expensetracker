import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { enGB } from "date-fns/locale";
import "react-day-picker/src/style.css";

export const TransactionForm = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const customLocale = {
    ...enGB,
    options: {
      ...enGB.options,
      weekStartsOn: 1,
    },
  };

  const formatDate = (date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  };

  const handleSubmit = (isExpense) => {
    if (!description || !amount || !date) return;

    const signedAmount = isExpense
      ? -Math.abs(parseFloat(amount))
      : Math.abs(parseFloat(amount));

    const newTransaction = {
      id: crypto.randomUUID(),
      description,
      amount: signedAmount,
      date: date.toISOString(),
      type: isExpense ? "expense" : "income",
    };

    onAdd(newTransaction);
    setDescription("");
    setAmount("");
    setDate(new Date());
    setShowCalendar(false);
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

      <div className="mb-4 relative">
        <label className="block text-sm text-gray-600 mb-1">Date</label>
        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full text-left p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          {formatDate(date)}
        </button>
        <div
          className={`absolute z-20 mt-2 bg-white border rounded shadow-md transition-all duration-300 ease-in-out origin-top ${
            showCalendar
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
                setShowCalendar(false);
              }
            }}
            className="p-2"
            modifiers={{
              weekend: { dayOfWeek: [0, 6] },
            }}
            modifiersClassNames={{
              weekend: "text-red-500 font-semibold",
            }}
            locale={customLocale}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Add Income
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(true)}
          className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};
