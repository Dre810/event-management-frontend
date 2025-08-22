import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

export default function ResetPassword() {
  const { token } = useParams(); // from URL
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Reset failed');
      }

      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      {error && <p className="error-msg">{error}</p>}
      {message && <p className="success-msg">{message}</p>}

      <form onSubmit={handleReset} className="reset-password-form">
        <label>
          New Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </label>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}
