import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EventDetails, LandingPage } from './pages';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
      </Routes>
    </div>
  );
};

export default App;
