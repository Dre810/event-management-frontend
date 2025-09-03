import React, { useState } from 'react';
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

  // Event form state
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

    // Validate
    if (!formData.title || !formData.date || !formData.location || !formData.price) {
      setStatus('⚠️ Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add token header here if needed
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
