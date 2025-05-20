import React from "react";
import { useRef, useState } from 'react';

export default function UserProfileCard({ user }) {
  const [status, setStatus] = useState('');
  const [showToast, setShowToast] = useState(false);
  const inputRef = useRef();
  const emailRef = useRef();

  const handleUpdate = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const copyEmail = () => {
    emailRef.current.select();
    document.execCommand('copy');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <div className="flex items-center gap-2">
        <input ref={emailRef} readOnly value={user.email} className="border px-2 py-1 rounded" />
        <button onClick={copyEmail} className="text-sm bg-gray-300 px-2 py-1 rounded">Copy Email</button>
      </div>
      <p>Company: {user.company.name} <span className="ml-2 px-2 py-1 bg-green-200 text-green-800 rounded text-xs">Your Company</span></p>

      <div className="mt-4">
        <input
          ref={inputRef}
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button onClick={handleUpdate} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          Update Status
        </button>
        {showToast && <p className="text-green-600 mt-2">Status Updated</p>}
      </div>
    </div>
  );
}