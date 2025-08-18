import React from 'react';
import './Dashboard.css';

const events = [
  {
    id: '1',
    title: 'Nairobi Music Festival',
    description: 'A vibrant celebration of music and culture.',
    date: '2025-09-01',
    location: 'Nairobi',
    price: 1500,
    image: 'concert.png',
    backendId: '689ef8b1c1501bf4d9326049',
  },
  {
    id: '2',
    title: 'Tech Expo 2025',
    description: 'Showcasing the latest in tech innovation.',
    date: '2025-10-15',
    location: 'Mombasa',
    price: 2000,
    image: 'tech.png',
    backendId: '689ef8b1c1501bf4d932604a',
  },
  {
    id: '3',
    title: 'Coastal Food Carnival',
    description: 'A feast of flavors and culinary experiences.',
    date: '2025-08-25',
    location: 'Diani',
    price: 1000,
    image: 'festival.png',
    backendId: '689ef8b1c1501bf4d932604b',
  },
  {
    id: '4',
    title: 'Art in the Park',
    description: 'An outdoor exhibition showcasing local artists.',
    date: '2025-11-05',
    location: 'Nairobi',
    price: 800,
    image: 'fellowship.png',
    backendId: '689ef8b1c1501bf4d932604c',
  },
  {
    id: '5',
    title: 'Cultural Heritage Festival',
    description: 'Celebrating the rich cultural heritage of the region.',
    date: '2025-12-10',
    location: 'Nairobi',
    price: 1200,
    image: 'heritage.png',
    backendId: '689ef8b1c1501bf4d932604d',
  },
  {
    id: '6',
    title: 'DJ Party',
    description: 'A night of electrifying music and dance.',
    date: '2025-12-15',
    location: 'Nairobi',
    price: 1800,
    image: 'djparty.png',
    backendId: '689ef8b1c1501bf4d932604e',
  }
];

export default function Dashboard() {
const handleBookNow = async (event) => {
  const token = localStorage.getItem('token');
  const phone = prompt('Enter your phone number (e.g., 07XXXXXXXX)');
  if (!phone) return;

  try {
    const response = await fetch('http://localhost:5000/api/mpesa/stk-push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        phoneNumber: phone,
        amount: event.price,
      }),
    });
    const data = await response.json();
    alert(data.message);
  } catch (err) {
    alert('Payment initiation failed.');
    console.error(err);
  }
};


  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Upcoming Events</h1>
      <div className="event-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <img
              src={`/images/${event.image}`}
              alt={event.title}
              className="event-image"
            />
            <div className="event-content">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Price:</strong> KES {event.price}</p>
              <button className="book-btn" onClick={() => handleBookNow(event)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
