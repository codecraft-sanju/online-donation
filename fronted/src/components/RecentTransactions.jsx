import React from 'react';

export default function RecentTransactions({ recentTransactions, darkMode }) {
  return (
    recentTransactions.length > 0 && (
      <div
        className={`w-full max-w-md shadow-lg rounded-2xl mt-6 p-4 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
      >
        <h3 className="text-xl font-semibold mb-3">Recent Transactions</h3>
        <ul>
          {recentTransactions.map((transaction) => (
            <li
              key={transaction.id}
              className={
                transaction.type === 'donation'
                  ? 'text-green-400'
                  : 'text-red-400'
              }
            >
              {transaction.familyMember}{' '}
              {transaction.type === 'donation' ? 'donated' : 'spent'} ₹
              {transaction.amount} on {transaction.timestamp}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
