import React from 'react';

export default function TransactionForm({
  transactionData,
  setTransactionData,
  handleTransaction,
  darkMode,
}) {
  // Direct state update for input fields without debounce
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div
      className={`w-full max-w-md shadow-lg rounded-2xl mt-6 p-6 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Add a Transaction
      </h2>

      {/* Family Member Input */}
      <input
        type="text"
        name="familyMember"
        value={transactionData.familyMember}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg mb-4 bg-transparent"
        placeholder="Enter Family Member Name"
      />

      {/* Transaction Type Selection */}
      <select
        name="transactionType"
        value={transactionData.transactionType}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg mb-4 bg-transparent"
      >
        <option value="donation">Donation</option>
        <option value="expense">Expense</option>
      </select>

      {/* Amount Input */}
      <input
        type="number"
        name="amount"
        value={transactionData.amount}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg mb-4 bg-transparent"
        placeholder="Enter Amount"
      />

      {/* Submit Button */}
      <button
        onClick={handleTransaction}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
      >
        Save Transaction
      </button>
    </div>
  );
}
