import React, { useState } from 'react';
import './UserTickets.css';

const events = [
  {
    id: 1,
    title: 'Nairobi Music Festival',
    date: '2025-09-15',
    location: 'KICC, Nairobi',
    price: 1500,
    image: '/images/festival.png',
  },
  {
    id: 2,
    title: 'Beach Vibes Concert',
    date: '2025-10-03',
    location: 'Diani Beach',
    price: 2000,
    image: '/images/concert.png',
  },
  {
    id: 3,
    title: 'Jazz Night Live',
    date: '2025-08-25',
    location: 'The Alchemist, Nairobi',
    price: 1200,
    image: '/images/heritage.png',
  },
  {
    id: 4,
    title: 'Afrobeat Experience',
    date: '2025-09-05',
    location: 'Carnivore Grounds',
    price: 1800,
    image: '/images/fellowship.png',
  },
  {
    id: 5,
    title: 'Lamu Cultural Festival',
    date: '2025-11-12',
    location: 'Lamu Island',
    price: 2500,
    image: '/images/tech.png',
  },
  {
    id: 6,
    title: 'Electronic Sundowner',
    date: '2025-12-20',
    location: 'Ngong Hills',
    price: 1600,
    image: '/images/djparty.png',
  },
  {
    id: 7,
    title: 'Kisumu Art Expo',
    date: '2025-11-25',
    location: 'Kisumu Museum',
    price: 2200,
    image: '/images/art.png',
  },
  {
    id: 8,
    title: 'Virtual Reality Expo',
    date: '2025-12-15',
    location: 'Online',
    price: 3000,
    image: '/images/virsualreality.png',
  },
];

export default function UserTickets() {
  const [phone, setPhone] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loadingEventId, setLoadingEventId] = useState(null);

  const handleBuyTicket = async (eventId, amount) => {
    if (!phone || phone.length !== 12 || !phone.startsWith('254')) {
      setStatusMessage('⚠️ Please enter a valid phone number (e.g. 254712345678)');
      return;
    }

    setLoadingEventId(eventId);
    setStatusMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/mpesa/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount }),
      });

      const data = await response.json();

      if (response.ok && data.ResponseCode === '0') {
        setStatusMessage('✅ Payment request sent! Check your phone to enter PIN.');
      } else {
        setStatusMessage('❌ Payment failed. Please try again.');
        console.error('Payment error:', data);
      }
    } catch (error) {
      console.error('Request error:', error);
      setStatusMessage('❌ Server error. Please try again later.');
    } finally {
      setLoadingEventId(null);
    }
  };

  return (
    <div className="tickets-container">
      <h1 className="tickets-heading">🎫 Book Your Event Ticket</h1>

      <div className="phone-input-container">
        <input
          type="text"
          className="phone-input"
          placeholder="Enter your phone number (e.g. 254712345678)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="tickets-grid">
        {events.map((event) => (
          <div key={event.id} className="ticket-card">
            <img src={event.image} alt={event.title} className="ticket-image" />
            <div className="ticket-details">
              <h2>{event.title}</h2>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Price:</strong> KES {event.price}</p>
              <button
                className="btn-buy-ticket"
                onClick={() => handleBuyTicket(event.id, event.price)}
                disabled={loadingEventId === event.id}
              >
                {loadingEventId === event.id ? 'Processing...' : 'Buy Ticket'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {statusMessage && (
        <div className="status-message">
          <p>{statusMessage}</p>
        </div>
      )}
    </div>
  );
}
