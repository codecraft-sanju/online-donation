import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function PieChartComponent({ totalDonation, totalExpenses }) {
  const data = [
    { name: 'Donations', value: totalDonation },
    { name: 'Expenses', value: totalExpenses },
  ];
  const COLORS = ['#4CAF50', '#F44336'];

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
