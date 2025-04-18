import { useState, useEffect } from "react";
import { BalanceSummary } from "./BalanceSummary";
import { TransactionForm } from "./TransactionForm";
import { TransactionList } from "./TransactionList";
import { SpendingChart } from "./SpendingChart";
import { useAuth } from "./context/AuthContext";
import axios from "axios";

const API_URL = "http://localhost:3000/api/transactions";

export const Body = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add transaction
  const handleAddTransaction = async (txn) => {
    if (!token) return console.error("User not logged in");

    try {
      const response = await axios.post(API_URL, txn, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions((prev) => [response.data, ...prev]);
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  // Delete transaction
  const handleDelete = async (id) => {
    if (!token) return console.error("User not logged in");

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions((prev) => prev.filter((txn) => txn._id !== id));
    } catch (err) {
      console.error(
        "Error deleting transaction:",
        err.response?.data || err.message
      );
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    fetchTransactions();
  }, [token]);

  return (
    <div className="body p-4 max-w-xl mx-auto">
      <BalanceSummary transactions={transactions} />
      <TransactionForm onAdd={handleAddTransaction} />
      {loading ? (
        <div>Loading transactions...</div>
      ) : (
        <>
          {transactions.length > 0 ? (
            <>
              <TransactionList
                transactions={transactions}
                onDelete={handleDelete}
              />
              <SpendingChart transactions={transactions} />
            </>
          ) : (
            <div>No transactions found.</div>
          )}
        </>
      )}
    </div>
  );
};
