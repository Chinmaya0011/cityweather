// WeatherContext.jsx
import React, { createContext, useState } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''||'bhubaneswar');

  return (
    <WeatherContext.Provider value={{ cities, setCities, searchTerm, setSearchTerm }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext; // Add this line to provide a default export
