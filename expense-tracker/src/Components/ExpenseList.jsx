import React from 'react';

function ExpenseList({ expenses }) {
  return (
    <ul className="divide-y mb-4">
      {expenses.map(exp => (
        <li key={exp.id} className="py-2 flex justify-between">
          <span>{exp.title}</span>
          <span>₹{exp.amount.toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
