import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ToggleButton from './components/ToggleButton';
import PieChartComponent from './components/PieChartComponent';
import TransactionForm from './components/TransactionForm';
import RecentTransactions from './components/RecentTransactions';

export default function App() {
  const [totalDonation, setTotalDonation] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [familyMember, setFamilyMember] = useState('');
  const [transactionType, setTransactionType] = useState('donation');
  const [amount, setAmount] = useState('');

  // 🌟 API Call: Fetch Transactions on Component Mount
  useEffect(() => {
    document.body.className = darkMode
      ? 'bg-gray-900 text-white'
      : 'bg-gray-100 text-gray-900';

    fetchTransactions();
  }, [darkMode]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/transactions');
      setRecentTransactions(res.data);
      calculateTotals(res.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const calculateTotals = (transactions) => {
    const donations = transactions
      .filter((t) => t.type === 'donation')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    setTotalDonation(donations);
    setTotalExpenses(expenses);
  };

  const handleTransaction = async () => {
    if (!amount || amount <= 0 || !familyMember) {
      alert('Please enter valid details');
      return;
    }

    const newTransaction = {
      familyMember,
      amount: parseInt(amount),
      type: transactionType,
    };

    try {
      await axios.post('http://localhost:5000/transactions', newTransaction);
      fetchTransactions(); 
      setAmount('');
      setFamilyMember('');
      setTransactionType('donation');
    } catch (error) {
      console.error('Error saving transaction:', error);
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
