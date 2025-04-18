export const BalanceSummary = ({ transactions = [] }) => {
  const amounts = transactions.map((txn) => txn.amount);

  const income = amounts
    .filter((a) => a > 0)
    .reduce((sum, val) => sum + val, 0);

  const expense = amounts
    .filter((a) => a < 0)
    .reduce((sum, val) => sum + val, 0);

  const balance = income + expense;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Income</p>
          <p className="text-xl font-semibold text-green-500">
            ₹{income.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Expense</p>
          <p className="text-xl font-semibold text-red-500">
            ₹{Math.abs(expense).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-xl font-semibold text-blue-600">
            ₹{balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
