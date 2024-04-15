import React, { useContext, useState, useEffect } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { FaTemperatureHigh, FaTemperatureLow, FaWind, FaTint, FaCompress,FaSun  } from 'react-icons/fa';
import '../styles/weather.css'
const Weather = () => {
    const { searchTerm } = useContext(WeatherContext);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const apiKey = '2e4d752a8e05dbebfbfe6875b32cba0a'; // Replace this with your OpenWeatherMap API key
    const cities = [searchTerm]; // Example list of cities

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [searchTerm, apiKey]);

    return (
        <div className="container1">
            <h1 style={{textAlign:"center"}}>{searchTerm}</h1>
        {loading ? (
            <div className="loading-message">Loading...</div>
        ) : (
            <>
                {weatherData && (
                  <div className="weather-details-container">
                  <div class="weather-detail">
                                          <div class="weather-detail-icon"><FaTemperatureHigh /></div>
                      <div class="weather-detail-data">{weatherData.main.temp}°C</div>

                    <h1>Temperature</h1>  
                  </div>
                  <div class="weather-detail">
                                  <div class="weather-detail-icon"><FaTemperatureLow /></div>
                      <div class="weather-detail-data">{weatherData.weather[0].description}</div>
        <h1>Description</h1>
                      
                  </div>
                  <div class="weather-detail">   
                   <div class="weather-detail-icon"><FaTint /></div>
                      <div class="weather-detail-data">{weatherData.main.humidity}%</div>
                  <h1>Humidity</h1>
                      
                  </div>
                  <div class="weather-detail">
                      <div class="weather-detail-icon"><FaWind /></div>
                      <div class="weather-detail-data">{weatherData.wind.speed} m/s</div>
                    <h1>                      Wind Speed
</h1>
                  </div>
                  <div class="weather-detail">
                       <div class="weather-detail-icon"><FaCompress /></div>
                      <div class="weather-detail-data">{weatherData.main.pressure} hPa</div>
                   <h1>Pressure</h1>
                      
                  </div>
                  <div className="weather-detail">
            <div className="weather-detail-icon"><FaSun /></div>
            <div className="weather-detail-data">{weatherData.uvIndex}</div>
            <h1>UV Index</h1>
        </div>
              </div>
              
                )}
                <table className="city-table">
                    <thead>
                        <tr>
                            <th className="table-header">City</th>
                            <th className="table-header">Day High</th>
                            <th className="table-header">Day Low</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map(city => (
                            <tr key={city} className="table-row">
                                <td className="table-data">{city}</td>
                                <td className="table-data">{weatherData?.main.temp_max || '-'}</td>
                                <td className="table-data">{weatherData?.main.temp_min || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )}
    </div>
    
    
    );
};

export default Weather;
