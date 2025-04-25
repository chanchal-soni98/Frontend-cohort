import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function ExpenseChart({ expenses }) {
  const data = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    total: 0
  }));

  expenses.forEach(({ date, amount }) => {
    const month = new Date(date).getMonth();
    data[month].total += Number(amount);
  });

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill={prefersDark ? '#8884d8' : '#82ca9d'} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ExpenseChart;
