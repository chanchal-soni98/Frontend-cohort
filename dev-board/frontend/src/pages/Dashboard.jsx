import React from "react";
import { useAuth } from '../contexts/AuthContext';
import UserProfileCard from '../components/UserProfileCard';
import ThemeToggle from '../components/ThemeToggle';

export default function Dashboard() {
  const { user, logout, loading, error } = useAuth();

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <ThemeToggle />
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </div>
      {loading ? (
        <p>Loading your data…</p>
      ) : error ? (
        <p className="text-red-500">Failed to load profile</p>
      ) : !user ? (
        <p>Please login to see your dashboard</p>
      ) : (
        <UserProfileCard user={user} />
      )}
    </div>
  );
}
