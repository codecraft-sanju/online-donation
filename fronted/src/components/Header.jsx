import React from 'react';

export default function Header({ totalDonation, totalExpenses }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-2">Family Finance Tracker</h1>
      <p className="text-lg">Keep track of donations and expenses</p>
      <p className="mt-2 text-green-400 font-semibold">
        Total Donations: ₹{totalDonation}
      </p>
      <p className="mt-1 text-red-400 font-semibold">
        Total Expenses: ₹{totalExpenses}
      </p>
      <p className="mt-1 text-blue-400 font-semibold">
        Cash in Hand: ₹{totalDonation - totalExpenses}
      </p>
    </div>
  );
}
