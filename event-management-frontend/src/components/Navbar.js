import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();         // Clear user context and token
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Event Management
        </Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" className="nav-link">
                Admin Dashboard
              </Link>
            )}
            {user.role === 'employee' && (
              <Link to="/employee" className="nav-link">
                Employee Dashboard
              </Link>
            )}
            {user.role === 'user' && (
              <Link to="/user" className="nav-link">
                Buy Tickets
              </Link>
            )}

            <button onClick={handleLogout} className="nav-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
