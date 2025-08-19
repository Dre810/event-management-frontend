import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Hook to use context easily
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On mount, load user from localStorage if token exists
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function to save user & token
  function login(userData) {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    // token should already be saved in login component after fetch
  }

  // Logout function to clear everything
  function logout() {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
