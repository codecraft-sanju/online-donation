import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToggleButton from './components/ToggleButton';
import PieChartComponent from './components/PieChartComponent';
import TransactionForm from './components/TransactionForm';
import RecentTransactions from './components/RecentTransactions';

export default function App() {
  const [amount, setAmount] = useState(100);
  const [totalDonation, setTotalDonation] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [familyMember, setFamilyMember] = useState('');
  const [transactionType, setTransactionType] = useState('donation');

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
      timestamp: new Date().toLocaleString(),
    };
    setRecentTransactions((prev) => [newTransaction, ...prev]);
    if (transactionType === 'donation') {
      setTotalDonation((prev) => prev + parseInt(amount));
    } else {
      setTotalExpenses((prev) => prev + parseInt(amount));
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 relative ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <ToggleButton darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header totalDonation={totalDonation} totalExpenses={totalExpenses} />
      <PieChartComponent
        totalDonation={totalDonation}
        totalExpenses={totalExpenses}
      />
      <TransactionForm
        {...{
          amount,
          setAmount,
          familyMember,
          setFamilyMember,
          transactionType,
          setTransactionType,
          handleTransaction,
          darkMode,
        }}
      />
      <RecentTransactions
        recentTransactions={recentTransactions}
        darkMode={darkMode}
      />
    </div>
  );
}
