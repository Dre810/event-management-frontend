import React, { useEffect, useState } from 'react';
import './Reports.css';

export default function Reports() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch('http://localhost:5000/api/events', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch event data');
        const data = await res.json();
        setEvents(data.events || data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  const exportToCSV = () => {
    const headers = ['Title,Date,Location,Price'];
    const rows = events.map(event =>
      `${event.title},${new Date(event.date).toLocaleDateString()},${event.location},${event.price}`
    );
    const csvContent = headers.concat(rows).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'event_report.csv';
    link.click();
  };

  return (
    <div className="reports-container">
      <h1>📊 Event Reports</h1>

      {error && <p className="error-msg">{error}</p>}

      <div className="report-actions">
        <p><strong>Total Events:</strong> {events.length}</p>
        <button onClick={exportToCSV}>Export as CSV</button>
      </div>

      <table className="report-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Price (KES)</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event._id || event.id}>
              <td>{event.title}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
