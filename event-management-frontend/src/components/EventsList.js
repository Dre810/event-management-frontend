import React, { useEffect, useState } from 'react';

function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events') // replace with your backend URL
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      {events.map(event => (
        <div key={event._id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          {/* Add other event info here */}
        </div>
      ))}
    </div>
  );
}

export default EventsList;
