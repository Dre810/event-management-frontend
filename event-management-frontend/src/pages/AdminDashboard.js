import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout(); // clear context
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/create-event">Create Event</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h1>Welcome, {user?.username || 'Admin'} 👋</h1>
          <p>Manage events, view reports, and more.</p>
        </header>

        <section className="dashboard-content">
          {/* Add your backend stats later */}
          <div className="card">Total Events: 12</div>
          <div className="card">Total Tickets Sold: 320</div>
          <div className="card">Total Revenue: KES 192,000</div>
        </section>
      </main>
    </div>
  );
}
