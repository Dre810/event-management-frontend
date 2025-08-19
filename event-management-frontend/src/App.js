import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import UserTickets from './pages/UserTickets';
import Navbar from './components/Navbar';
import Reports from './pages/Reports';
import { AuthProvider } from './context/AuthContext';

// ProtectedRoute component to restrict access by role
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function App() {
  return (
    <AuthProvider>
      {/* your Routes here */}
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          user ? (
            user.role === 'admin' ? (
              <Navigate to="/admin" replace />
            ) : user.role === 'employee' ? (
              <Navigate to="/employee" replace />
            ) : (
              <Navigate to="/user" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={['employee']}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserTickets />
          </ProtectedRoute>
        }
      />
  <Route
    path="/create-event"
    element={
      <ProtectedRoute allowedRoles={['employee']}>
        <EmployeeDashboard />
      </ProtectedRoute>
    }
  />

  <Route path="/reports" element={
  <ProtectedRoute allowedRoles={['admin', 'employee']}>
    <Reports />
  </ProtectedRoute>
} />


</Routes>
  );
}

export default function App() {
  const location = useLocation();

  // Hide Navbar on login page
  const hideNavbarOnPaths = ['/login'];

  return (
    <AuthProvider>
      {/* Show Navbar only if NOT on login page */}
      {!hideNavbarOnPaths.includes(location.pathname) && <Navbar />}
      <AppRoutes />
    </AuthProvider>
  );
}
