import React, { useState } from 'react';
import './CreateEvent.css';

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: '',
    image: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to create event');
      }

      setSuccess('✅ Event created successfully!');
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        price: '',
        image: '',
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-event-container">
      <h1>Create New Event</h1>

      {success && <p className="success-msg">{success}</p>}
      {error && <p className="error-msg">{error}</p>}

      <form className="event-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>

        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>

        <label>
          Location:
          <input name="location" value={formData.location} onChange={handleChange} required />
        </label>

        <label>
          Price (KES):
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>

        <label>
          Image URL (optional):
          <input name="image" value={formData.image} onChange={handleChange} />
        </label>

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
