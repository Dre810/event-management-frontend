import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.username || 'Admin'}!</h1>
        <p className="dashboard-role">Role: Admin</p>
      </header>

      <main className="dashboard-main">
        <h2>Admin Controls</h2>
        <p>Here you can manage employees, events, and generate reports.</p>
        {/* Add admin-specific features here */}
      </main>
    </div>
  );
}
