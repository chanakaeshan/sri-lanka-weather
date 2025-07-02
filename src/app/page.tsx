import React, { useState, useEffect } from 'react';
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Sun, Cloud, CloudRain, CloudSnow, Zap } from 'lucide-react';

type ForecastDay = {
  day: string;
  high: number;
  low: number;
  condition: string;
};

type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  uvIndex: number;
  feelsLike: number;
  forecast: ForecastDay[];
};

const WeatherApp = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Colombo');

  // Major Sri Lankan cities
  const sriLankanCities = [
    'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Trincomalee', 
    'Batticaloa', 'Matara', 'Ratnapura', 'Badulla', 'Kurunegala', 
    'Anuradhapura', 'Polonnaruwa', 'Hambantota', 'Vavuniya', 'Mannar',
    'Nuwara Eliya', 'Ella', 'Sigiriya', 'Bentota'
  ];

  const filteredCities = sriLankanCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock weather data generator (replace with real API)
  const generateMockWeather = (city: string) => {
    const conditions = ['sunny', 'cloudy', 'rainy', 'partly-cloudy'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      city: city,
      country: 'Sri Lanka',
      temperature: Math.floor(Math.random() * 10) + 25, // 25-35°C typical for Sri Lanka
      condition: condition,
      humidity: Math.floor(Math.random() * 30) + 60, // 60-90%
      windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
      visibility: Math.floor(Math.random() * 5) + 8, // 8-12 km
      pressure: Math.floor(Math.random() * 20) + 1005, // 1005-1025 hPa
      uvIndex: Math.floor(Math.random() * 8) + 3, // 3-10
      feelsLike: Math.floor(Math.random() * 8) + 28, // 28-35°C
      forecast: Array.from({ length: 5 }, (_, i) => ({
        day: ['Today', 'Tomorrow', 'Tuesday', 'Wednesday', 'Thursday'][i],
        high: Math.floor(Math.random() * 8) + 28,
        low: Math.floor(Math.random() * 5) + 22,
        condition: conditions[Math.floor(Math.random() * conditions.length)]
      }))
    };
  };

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd call: 
      // const response = await fetch(`/api/weather?city=${city}`);
      // const data = await response.json();
      
      const mockData = generateMockWeather(city);
      setWeather(mockData);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-16 h-16 text-yellow-400" />;
      case 'cloudy': return <Cloud className="w-16 h-16 text-gray-400" />;
      case 'rainy': return <CloudRain className="w-16 h-16 text-blue-400" />;
      case 'partly-cloudy': return <Cloud className="w-16 h-16 text-gray-300" />;
      default: return <Sun className="w-16 h-16 text-yellow-400" />;
    }
  };

  const getBackgroundGradient = (condition) => {
    switch (condition) {
      case 'sunny': return 'from-blue-400 via-blue-500 to-yellow-400';
      case 'cloudy': return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rainy': return 'from-gray-600 via-blue-600 to-blue-800';
      case 'partly-cloudy': return 'from-blue-300 via-gray-400 to-blue-500';
      default: return 'from-blue-400 via-blue-500 to-yellow-400';
    }
  };

  const getAnimatedBackground = (condition: string) => {
    switch (condition) {
      case 'rainy':
        return (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(condition)} transition-all duration-1000`}></div>
            {/* Rain animation */}
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 bg-white/30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                  height: `${10 + Math.random() * 20}px`,
                  transform: `translateY(-${Math.random() * 100}px)`,
                  animation: `rainDrop ${0.5 + Math.random() * 0.3}s linear infinite`
                }}
              />
            ))}
            <style jsx>{`
              @keyframes rainDrop {
                to {
                  transform: translateY(100vh);
                }
              }
            `}</style>
          </div>
        );
      case 'sunny':
        return (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(condition)} transition-all duration-1000`}></div>
            {/* Sun rays animation */}
            <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
              <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse"></div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-16 bg-yellow-200 origin-bottom opacity-60"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                    animation: `sunRay 3s ease-in-out infinite ${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            {/* Floating particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-200 rounded-full opacity-40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              />
            ))}
            <style jsx>{`
              @keyframes sunRay {
                0%, 100% { transform: translate(-50%, -100%) rotate(${0}deg) scale(1); }
                50% { transform: translate(-50%, -100%) rotate(${0}deg) scale(1.2); }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
              }
            `}</style>
          </div>
        );
      case 'cloudy':
        return (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(condition)} transition-all duration-1000`}></div>
            {/* Moving clouds */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute opacity-20"
                style={{
                  left: `${-20 + Math.random() * 120}%`,
                  top: `${10 + Math.random() * 60}%`,
                  animation: `cloudMove ${15 + Math.random() * 10}s linear infinite ${Math.random() * 5}s`
                }}
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-white rounded-full"></div>
                  <div className="w-24 h-24 bg-white rounded-full -ml-6"></div>
                  <div className="w-20 h-20 bg-white rounded-full -ml-8"></div>
                  <div className="w-12 h-12 bg-white rounded-full -ml-4"></div>
                </div>
              </div>
            ))}
            <style jsx>{`
              @keyframes cloudMove {
                from { transform: translateX(-100px); }
                to { transform: translateX(calc(100vw + 100px)); }
              }
            `}</style>
          </div>
        );
      case 'partly-cloudy':
        return (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(condition)} transition-all duration-1000`}></div>
            {/* Sun with moving clouds */}
            <div className="absolute top-20 right-20 w-24 h-24 opacity-30">
              <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse"></div>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute opacity-25"
                style={{
                  left: `${10 + i * 30}%`,
                  top: `${20 + i * 15}%`,
                  animation: `cloudMove ${20 + Math.random() * 10}s linear infinite ${i * 2}s`
                }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full"></div>
                  <div className="w-16 h-16 bg-white rounded-full -ml-4"></div>
                  <div className="w-14 h-14 bg-white rounded-full -ml-6"></div>
                </div>
              </div>
            ))}
            <style jsx>{`
              @keyframes cloudMove {
                from { transform: translateX(-50px); }
                to { transform: translateX(calc(100vw + 50px)); }
              }
            `}</style>
          </div>
        );
      default:
        return (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient('default')} transition-all duration-1000`}></div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative">
      {getAnimatedBackground(weather?.condition || 'default')}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            Sri Lanka Weather
          </h1>
          <p className="text-xl text-white/90">Beautiful island weather at your fingertips</p>
        </div>

        {/* Search Section */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Sri Lankan cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/20 backdrop-blur text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>
          
          {searchTerm && (
            <div className="mt-2 bg-white/20 backdrop-blur rounded-xl border border-white/30 max-h-48 overflow-y-auto">
              {filteredCities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setSearchTerm('');
                  }}
                  className="w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Weather Display */}
        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white mt-4 text-lg">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="text-center bg-red-500/20 backdrop-blur rounded-2xl p-6 max-w-md mx-auto border border-red-300/30">
            <p className="text-white text-lg">{error}</p>
            <button
              onClick={() => fetchWeather(selectedCity)}
              className="mt-4 px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : weather ? (
          <div className="max-w-4xl mx-auto">
            {/* Main Weather Card */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-6 border border-white/30 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                    <MapPin className="w-8 h-8" />
                    {weather.city}
                  </h2>
                  <p className="text-white/80 text-lg">{weather.country}</p>
                </div>
                <div className="text-right">
                  {getWeatherIcon(weather.condition)}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-6xl md:text-8xl font-bold text-white mb-2">
                    {weather.temperature}°
                  </div>
                  <p className="text-xl text-white/90 capitalize mb-2">
                    {weather.condition.replace('-', ' ')}
                  </p>
                  <p className="text-white/80">
                    Feels like {weather.feelsLike}°C
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white">
                    <Droplets className="w-6 h-6 text-blue-300" />
                    <span>Humidity: {weather.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <Wind className="w-6 h-6 text-gray-300" />
                    <span>Wind: {weather.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <Eye className="w-6 h-6 text-purple-300" />
                    <span>Visibility: {weather.visibility} km</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <Gauge className="w-6 h-6 text-green-300" />
                    <span>Pressure: {weather.pressure} hPa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border border-white/30 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="text-center p-4 bg-white/10 rounded-2xl border border-white/20">
                    <p className="text-white font-semibold mb-2">{day.day}</p>
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="text-white">
                      <p className="font-bold">{day.high}°</p>
                      <p className="text-white/70 text-sm">{day.low}°</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick City Access */}
            <div className="mt-6 bg-white/20 backdrop-blur-lg rounded-3xl p-6 border border-white/30 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Popular Cities</h3>
              <div className="flex flex-wrap gap-2">
                {['Colombo', 'Kandy', 'Galle', 'Negombo', 'Nuwara Eliya', 'Jaffna'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCity === city 
                        ? 'bg-white text-blue-600' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <div className="text-center mt-12 text-white/70">
          <p>Made with ❤️ for Beautiful Sri Lanka</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;