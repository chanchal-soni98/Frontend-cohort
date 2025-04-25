import React, { useState, useEffect } from 'react';
import ExpenseForm from './Components/ExpenseForm';
import ExpenseList from './Components/ExpenseList';
import ExpenseChart from './Components/ExpenseChart';

const LOCAL_STORAGE = 'm7-expenses';

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE);
    if (stored) setExpenses(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses(prev => [expense, ...prev.slice(0, 9)]);
  };

  const total = expenses.reduce((acc, cur) => acc + Number(cur.amount), 0);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <div className="text-xl font-semibold mb-2">Total: ₹{total}</div>
      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} />
      <ExpenseChart expenses={expenses} />
    </div>
  );
}

export default App;
