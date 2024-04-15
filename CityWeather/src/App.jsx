import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import { WeatherProvider } from './context/WeatherContext.jsx';
import WeatherPage from './pages/WeatherPage.jsx';

function App() {
  return (
    <WeatherProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </Router>
    </WeatherProvider>
  );
}

export default App;
