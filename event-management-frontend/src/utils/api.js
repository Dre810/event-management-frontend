const API_BASE = 'http://localhost:5000/api';

export const bookEvent = async (eventId, token) => {
  const res = await fetch(`${API_BASE}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ eventId })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Payment failed');
  return data;
};
