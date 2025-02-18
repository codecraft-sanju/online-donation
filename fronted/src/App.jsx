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
  const [transactionData, setTransactionData] = useState({
    familyMember: '',
    transactionType: 'donation',
    amount: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.className = darkMode
      ? 'bg-gray-900 text-white'
      : 'bg-gray-100 text-gray-900';
  }, [darkMode]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/transactions');
      setRecentTransactions(res.data);
      calculateTotals(res.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      alert('There was an issue fetching the transactions.');
    } finally {
      setLoading(false);
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
    if (
      !transactionData.amount ||
      transactionData.amount <= 0 ||
      !transactionData.familyMember ||
      isNaN(transactionData.amount)
    ) {
      alert('Please enter valid data.');
      return;
    }
    const newTransaction = {
      familyMember: transactionData.familyMember,
      amount: parseInt(transactionData.amount),
      type: transactionData.transactionType,
    };
    await axios.post('http://localhost:5000/transactions', newTransaction);
    fetchTransactions();
  };

  const themeStyles = darkMode
    ? { bgColor: 'bg-gray-900', textColor: 'text-white' }
    : { bgColor: 'bg-gray-100', textColor: 'text-gray-900' };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 relative ${themeStyles.bgColor} ${themeStyles.textColor}`}
    >
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="ml-4">Loading transactions...</p>
        </div>
      ) : (
        <>
          <ToggleButton darkMode={darkMode} setDarkMode={setDarkMode} />
          <Header totalDonation={totalDonation} totalExpenses={totalExpenses} />
          <PieChartComponent
            totalDonation={totalDonation}
            totalExpenses={totalExpenses}
          />
          <TransactionForm
            transactionData={transactionData}
            setTransactionData={setTransactionData}
            handleTransaction={handleTransaction}
            darkMode={darkMode}
          />
          <RecentTransactions
            recentTransactions={recentTransactions}
            darkMode={darkMode}
          />
        </>
      )}
    </div>
  );
}
