import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth.js';
import Dashboard from './pages/Dashboard.js';
import Events from './pages/Events.js';
import CreateEvent from './components/CreateEvent.js';
import EventsList from './components/EventsList.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/events" element={<Events />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/events-list" element={<EventsList />} />
    </Routes>
  );
}

export default App;