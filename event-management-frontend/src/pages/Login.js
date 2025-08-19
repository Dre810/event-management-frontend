import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login
    const userData = { username, role };
    login(userData);

    // Redirect after login
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'employee') {
      navigate('/employee');
    } else {
      navigate('/user');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Dashboard</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username:
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </label>

        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="user">User</option>
          </select>
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
