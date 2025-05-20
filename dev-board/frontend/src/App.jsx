
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/Login';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}