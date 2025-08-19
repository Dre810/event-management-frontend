import React, { useEffect, useState } from 'react';
import './EventsList.css';

export default function EventsList({ role }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError('');

      try {
        const res = await fetch('http://localhost:5000/api/events'); // adjust URL as needed
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data.events || data); // depends on your backend response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="error-msg">{error}</p>;

  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div className="events-list">
      {events.map(event => (
        <div key={event._id || event.id} className="event-card">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
          {role === 'user' && (
            <button className="btn-buy">Buy Ticket</button>
          )}
          {/* You can add edit/delete buttons here for employees/admin */}
        </div>
      ))}
    </div>
  );
}
