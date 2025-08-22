import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ForgotPassword.js';
import './Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Registration failed');
      }

      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <form onSubmit={handleRegister} className="register-form">
        <label>
          Full Name
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a strong password"
          />
        </label>

        <button type="submit">Register</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}
