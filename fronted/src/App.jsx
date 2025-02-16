import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon } from 'lucide-react';

export default function App() {
  const [amount, setAmount] = useState(100);
  const [totalDonation, setTotalDonation] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [donationGoal, setDonationGoal] = useState(10000);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [familyMember, setFamilyMember] = useState('');
  const [transactionType, setTransactionType] = useState('donation');
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    document.body.className = darkMode
      ? 'bg-gray-900 text-white'
      : 'bg-gray-100 text-gray-900';
  }, [darkMode]);

  const handleTransaction = () => {
    if (!amount || amount <= 0 || !familyMember) return;
    const newTransaction = {
      id: Date.now(),
      amount: parseInt(amount),
      familyMember,
      type: transactionType,
    };
    setRecentTransactions((prev) => [newTransaction, ...prev]);
    if (transactionType === 'donation') {
      setTotalDonation((prev) => prev + parseInt(amount));
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    } else {
      setTotalExpenses((prev) => prev + parseInt(amount));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 relative">
      <div className="absolute top-4 right-4 flex items-center">
        <span className="mr-2 text-sm font-medium">
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
        <div
          className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}
          onClick={() => setDarkMode(!darkMode)}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-all ${
              darkMode ? 'translate-x-6' : 'translate-x-0'
            }`}
          ></div>
        </div>
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">Family Finance Tracker</h1>
        <p className="text-lg">Keep track of donations and expenses</p>
        <p className="mt-2 text-green-500 font-semibold">
          Total Donations: ₹{totalDonation}
        </p>
        <p className="mt-1 text-red-500 font-semibold">
          Total Expenses: ₹{totalExpenses}
        </p>
        <p className="mt-1 text-blue-500 font-semibold">
          Cash in Hand: ₹{totalDonation - totalExpenses}
        </p>
      </motion.div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl mt-6 p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Add a Transaction
        </h2>
        <input
          type="text"
          value={familyMember}
          onChange={(e) => setFamilyMember(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
          placeholder="Enter Family Member Name"
        />
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
        >
          <option value="donation">Donation</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
          placeholder="Enter Amount"
        />
        <button
          onClick={handleTransaction}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-all transform hover:scale-105"
        >
          Save Transaction
        </button>
      </div>

      {recentTransactions.length > 0 && (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl mt-6 p-4">
          <h3 className="text-xl font-semibold mb-3">Recent Transactions</h3>
          <ul>
            {recentTransactions.map((transaction) => (
              <li
                key={transaction.id}
                className={
                  transaction.type === 'donation'
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {transaction.familyMember}{' '}
                {transaction.type === 'donation' ? 'donated' : 'spent'} ₹
                {transaction.amount}
              </li>
            ))}
          </ul>
        </div>
      )}

      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 bg-white dark:bg-gray-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
          >
            <CheckCircleIcon className="text-green-500" />
            <span>Thank you for your donation of ₹{amount}!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
