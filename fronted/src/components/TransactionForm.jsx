import React from 'react';

export default function TransactionForm({
  amount,
  setAmount,
  familyMember,
  setFamilyMember,
  transactionType,
  setTransactionType,
  handleTransaction,
  darkMode,
}) {
  return (
    <div
      className={`w-full max-w-md shadow-lg rounded-2xl mt-6 p-6 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Add a Transaction
      </h2>
      <input
        type="text"
        value={familyMember}
        onChange={(e) => setFamilyMember(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4 bg-transparent"
        placeholder="Enter Family Member Name"
      />
      <select
        value={transactionType}
        onChange={(e) => setTransactionType(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4 bg-transparent"
      >
        <option value="donation">Donation</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4 bg-transparent"
        placeholder="Enter Amount"
      />
      <button
        onClick={handleTransaction}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
      >
        Save Transaction
      </button>
    </div>
  );
}
