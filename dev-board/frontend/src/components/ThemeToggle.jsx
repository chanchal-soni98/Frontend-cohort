import { useTheme } from '../contexts/ThemeContext';
import React from "react";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}