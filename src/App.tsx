import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatbotPage from './components/ChatbotPage';
import ScreeningPage from './components/ScreeningPage';
import ResultsPage from './components/ResultsPage';
import ResourcesPage from './components/ResourcesPage';
import ProfilePage from './components/ProfilePage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/screening" element={<ScreeningPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;