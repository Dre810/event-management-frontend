import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/login');
  };

  return (
    <div className="employee-dashboard">
      <aside className="sidebar">
        <h2>Employee Panel</h2>
        <nav>
          <ul>
            <li><Link to="/employee">Dashboard</Link></li>
            <li><Link to="/create-event">Create Event</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h1>Welcome, {user?.username || 'Employee'} 👋</h1>
          <p>Here are your assigned events:</p>
        </header>

        <section className="event-list">
          <div className="event-card">
            <h3>Concert at City Park</h3>
            <p>Date: 12 Sept 2025</p>
            <p>Tickets Sold: 89</p>
          </div>
          <div className="event-card">
            <h3>Food Festival Nairobi</h3>
            <p>Date: 25 Sept 2025</p>
            <p>Tickets Sold: 142</p>
          </div>
          <div className="event-card">
            <h3>Music Festival Kisumu</h3>
            <p>Date: 5 Oct 2025</p>
            <p>Tickets Sold: 201</p>
          </div>
        </section>
      </main>
    </div>
  );
}
