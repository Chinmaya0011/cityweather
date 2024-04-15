import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate

import '../styles/allCity.css';
import { WeatherContext } from '../context/WeatherContext.jsx';

const AllCity = () => {
  const navigate = useNavigate(); // Getting the navigation function

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedCityTimezone, setSelectedCityTimezone] = useState('');
  const { cities, setCities,searchTerm, setSearchTerm } = useContext(WeatherContext);

  useEffect(() => {
    function fetchCountry() {
      return fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.name.common,
            code: country.cca2
          }));
          countries.sort((a, b) => a.name.localeCompare(b.name));
          setCountries(countries);
        })
        .catch(error => {
          console.error('Error fetching countries:', error);
          return [];
        });
    }

    fetchCountry();
  }, []);

  const fetchCities = (countryCode) => {
    const username = 'chinmaya17';
    const url = `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&orderby=population&maxRows=1000&username=${username}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const cities = data.geonames.map(city => city.toponymName);
        cities.sort((a, b) => a.localeCompare(b));
        setCities(cities);
        setSearchResults(cities.slice(0, 1000)); // Set search results initially to first 10 cities
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
        setCities([]);
      });
  };

  const fetchTimezone = (city) => {
    const apiKey = '2hadE5y8dmXxEEm8xWgQcQ==XFJQCKQxavHsUGJj'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = `https://api.api-ninjas.com/v1/timezone?city=${city}`;
    fetch(apiUrl, {
      headers: {
        'X-Api-Key': apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        setSelectedCityTimezone(data.timezone);
      })
      .catch(error => {
        console.error('Error fetching timezone:', error);
        setSelectedCityTimezone('');
      });
  };
  

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    const selectedCountryData = countries.find(country => country.name === event.target.value);
    if (selectedCountryData) {
      fetchCities(selectedCountryData.code);
    } else {
      alert('Please select a country first.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredCities = cities.filter(city =>
      city.toLowerCase().startsWith(event.target.value.toLowerCase())
    );
    setSearchResults(filteredCities.slice(0, 10)); // Limit to first 10 filtered cities
    setShowAutocomplete(true);
  };

 
  const handleCitySelect = (city) => {
    setSearchTerm(city);
    setShowAutocomplete(false);
    fetchTimezone(city); // Fetch timezone when city is selected
    setCities([city]); // Store the selected city in the state
    navigate('/weather'); // Navigate to the weather page
  };

  const handleSearchButtonClick = () => {
    setShowAutocomplete(false);
    // Here you can implement the logic to perform the city search
    // For example, you can use the selected country and search term
    navigate('/weather'); // Navigate to the weather page

  };

  return (
    <div className='container'>
      <div className='searchResult'>
        <div>
          <input
            className='searchInput'
            type="text"
            placeholder="Search city..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchButtonClick}>Search</button>
        </div>
        <div className='autocomplete'>
          {showAutocomplete && searchResults.length > 0 && (
            <div>
              <h3>Autosuggestions:</h3>
              <ul>
                {searchResults.map(city => (
                  <li key={city} onClick={() => handleCitySelect(city)}>{city}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='selection'>
        <div className='countrySelection'>
          <h2>Select a Country</h2>
          <select onChange={handleCountryChange} value={selectedCountry}>
            <option value="">Select a country</option>
            {countries.map(country => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className='citySelection'>
        <select onChange={(e) => handleCitySelect(e.target.value)}>
  <option value="">Select a city</option>
  {searchResults.length > 0 && searchResults.map(city => (
    <option key={city} value={city}>
      {city}
    </option>
  ))}
</select>

        </div>
      </div>
      {searchTerm && selectedCityTimezone && (
  <div className='timezoneTable'>
    <h2>Selected City Timezone</h2>
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>City</th>
          <th>Timezone</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{selectedCountry}</td>
          <td>{searchTerm}</td>
          <td>{selectedCityTimezone}</td>
        </tr>
      </tbody>
    </table>
  </div>
)}

    </div>
  );
};

export default AllCity;
