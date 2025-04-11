import React from "react";
import { Trash2 } from "lucide-react";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
};

export const TransactionList = ({ transactions = [], onDelete }) => {
  const grouped = transactions.reduce((acc, txn) => {
    const key = formatDate(txn.date);
    acc[key] = acc[key] || [];
    acc[key].push(txn);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => {
    const [da, ma, ya] = a.split("-").map(Number);
    const [db, mb, yb] = b.split("-").map(Number);
    return new Date(yb, mb - 1, db) - new Date(ya, ma - 1, da);
  });

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Transaction History
      </h2>

      <ul className="space-y-4 max-h-60 overflow-y-auto">
        {sortedDates.map((date) => (
          <li key={date}>
            <h3 className="text-sm font-semibold text-gray-500 mb-1">{date}</h3>
            <ul className="space-y-2">
              {grouped[date].map((txn) => (
                <li
                  key={txn.id}
                  className={`flex justify-between items-center p-2 rounded border ${
                    txn.amount >= 0 ? "border-green-300" : "border-red-300"
                  }`}
                >
                  <div className="flex flex-col text-sm text-gray-700">
                    <span>{txn.description}</span>
                    <span
                      className={`font-medium ${
                        txn.amount >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {txn.amount >= 0 ? "+" : "-"}₹
                      {Math.abs(txn.amount).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => onDelete(txn.id)}
                    className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                    aria-label="Delete transaction"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
