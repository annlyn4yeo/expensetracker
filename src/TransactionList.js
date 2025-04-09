import React from "react";
import { Trash2 } from "lucide-react";

export const TransactionList = ({ transactions = [], onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Transaction History
      </h2>

      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {transactions.map((txn) => (
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
                {txn.amount >= 0 ? "+" : "-"}${Math.abs(txn.amount).toFixed(2)}
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
    </div>
  );
};
