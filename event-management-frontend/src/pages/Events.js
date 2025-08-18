import React, { useEffect, useState } from 'react';
import './Events.css';
import axios from 'axios';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data.events);
      } catch (err) {
        console.error('Error fetching events:', err.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>
      <div className="events-grid">
        {events.map(event => (
          <div key={event._id} className="event-card">
            <img src={`/images/${event.image}`} alt={event.title} />
            <div className="event-info">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Price:</strong> KES {event.price}</p>
              <button>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
