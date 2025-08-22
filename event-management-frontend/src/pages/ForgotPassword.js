import React, { useState } from 'react';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to send reset email');
      }

      const data = await res.json();
      setMessage(data.message || 'Check your email for reset instructions.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleForgotPassword} className="forgot-password-form">
        <label>
          Enter your email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}
