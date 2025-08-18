import React, { useState } from 'react';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: '',
  });

  const token = localStorage.getItem('token'); // Make sure your auth token is saved here

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Event created successfully!');
        // Optionally reset form or redirect
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Create event error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input name="date" type="date" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} required />
      <input name="price" type="number" onChange={handleChange} required />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default CreateEvent;
