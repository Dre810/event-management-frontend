import React, { useState } from 'react';
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

  // Create Event Form State
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    price: '',
    image: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.location || !formData.price) {
      setStatus('⚠️ Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('✅ Event created successfully!');
        setFormData({ title: '', date: '', location: '', price: '', image: '' });
      } else {
        setStatus('❌ Error creating event.');
        console.error(result);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Server error. Try again later.');
    }
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
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h1>Welcome, {user?.username || 'Admin'} 👋</h1>
          <p>Manage events, view reports, and more.</p>
        </header>

        <section className="dashboard-content">
          <div className="card">Total Events: 12</div>
          <div className="card">Total Tickets Sold: 320</div>
          <div className="card">Total Revenue: KES 192,000</div>
        </section>

        <section className="create-event-form">
          <h2>Create New Event</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              placeholder="Event Date"
              value={formData.date}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price (KES)"
              value={formData.price}
              onChange={handleChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL (optional)"
              value={formData.image}
              onChange={handleChange}
            />
            <button type="submit">Add Event</button>
          </form>
          {status && <p className="status-message">{status}</p>}
        </section>
      </main>
    </div>
  );
}
