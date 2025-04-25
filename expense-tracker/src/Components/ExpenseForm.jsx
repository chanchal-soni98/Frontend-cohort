import React, { useState } from 'react';

function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return;

    onAdd({
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      date: new Date(date)
    });

    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="input" />
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required className="input" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="input" />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
