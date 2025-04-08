import { useState } from "react";
import { BalanceSummary } from "./BalanceSummary";
import { TransactionForm } from "./TransactionForm";

export const Body = () => {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (txn) => {
    setTransactions((prev) => [txn, ...prev]);
  };

  return (
    <div className="body p-4 max-w-xl mx-auto">
      <BalanceSummary transactions={transactions} />
      <TransactionForm onAdd={handleAddTransaction} />
    </div>
  );
};
