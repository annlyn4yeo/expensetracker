import { useState, useEffect } from "react";
import { BalanceSummary } from "./BalanceSummary";
import { TransactionForm } from "./TransactionForm";
import { TransactionList } from "./TransactionList";
import { SpendingChart } from "./SpendingChart";

const STORAGE_KEY = "expensify:transactions";

export const Body = () => {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (txn) => {
    setTransactions((prev) => [txn, ...prev]);
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((txn) => txn.id !== id));
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTransactions(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse stored transactions:", err);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div className="body p-4 max-w-xl mx-auto">
      <BalanceSummary transactions={transactions} />
      <TransactionForm onAdd={handleAddTransaction} />
      {transactions.length > 0 && (
        <>
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
          />
          <SpendingChart transactions={transactions} />
        </>
      )}
    </div>
  );
};
