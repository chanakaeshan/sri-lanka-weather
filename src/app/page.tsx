"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Sun, Cloud, 
  CloudRain, CloudSnow, Zap, Activity, Compass, Sunrise, Sunset, Moon
} from 'lucide-react';

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
  const [currentTime, setCurrentTime] = useState(new Date());

  const sriLankanCities = [
    'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Trincomalee', 
    'Batticaloa', 'Matara', 'Ratnapura', 'Badulla', 'Kurunegala', 
    'Anuradhapura', 'Polonnaruwa', 'Hambantota', 'Vavuniya', 'Mannar',
    'Nuwara Eliya', 'Ella', 'Sigiriya', 'Bentota'
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredCities = sriLankanCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateMockWeather = (city: string) => {
    const conditions = ['sunny', 'cloudy', 'rainy', 'partly-cloudy'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      city,
      country: 'Sri Lanka',
      temperature: Math.floor(Math.random() * 10) + 25,
      condition,
      humidity: Math.floor(Math.random() * 30) + 60,
      windSpeed: Math.floor(Math.random() * 15) + 5,
      visibility: Math.floor(Math.random() * 5) + 8,
      pressure: Math.floor(Math.random() * 20) + 1005,
      uvIndex: Math.floor(Math.random() * 8) + 3,
      feelsLike: Math.floor(Math.random() * 8) + 28,
      forecast: Array.from({ length: 5 }, (_, i) => ({
        day: ['Today', 'Tomorrow', 'Tuesday', 'Wednesday', 'Thursday'][i],
        high: Math.floor(Math.random() * 8) + 28,
        low: Math.floor(Math.random() * 5) + 22,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
      }))
    };
  };

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = generateMockWeather(city);
      setWeather(mockData);
    } catch {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const getWeatherIcon = (condition: string, size: string = "w-16 h-16") => {
    const iconClass = `${size} drop-shadow-lg transition-all duration-300 hover:scale-110`;
    switch (condition) {
      case 'sunny': return <Sun className={`${iconClass} text-yellow-400`} />;
      case 'cloudy': return <Cloud className={`${iconClass} text-gray-300`} />;
      case 'rainy': return <CloudRain className={`${iconClass} text-blue-400`} />;
      case 'partly-cloudy': return <Cloud className={`${iconClass} text-gray-200`} />;
      default: return <Sun className={`${iconClass} text-yellow-400`} />;
    }
  };

  const getBackgroundGradient = (condition: string) => {
    switch (condition) {
      case 'sunny': return 'from-orange-400 via-pink-500 to-purple-600';
      case 'cloudy': return 'from-gray-600 via-slate-700 to-gray-900';
      case 'rainy': return 'from-slate-800 via-blue-900 to-indigo-900';
      case 'partly-cloudy': return 'from-blue-500 via-purple-600 to-indigo-700';
      default: return 'from-cyan-400 via-blue-500 to-indigo-600';
    }
  };

  const getAnimatedBackground = (condition: string) => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(condition)} transition-all duration-1000`}></div>
        
        {/* Floating geometric shapes */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          >
            <div className={`w-${4 + Math.floor(Math.random() * 8)} h-${4 + Math.floor(Math.random() * 8)} bg-white/20 backdrop-blur-sm ${Math.random() > 0.5 ? 'rounded-full' : 'rounded-lg rotate-45'}`}></div>
          </div>
        ))}

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        ></div>

        {/* Weather-specific effects */}
        {condition === 'rainy' && (
          <>
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={`rain-${i}`}
                className="absolute w-0.5 bg-gradient-to-b from-blue-200 to-transparent opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  height: `${15 + Math.random() * 25}px`,
                  animation: `rainDrop ${0.8 + Math.random() * 0.4}s linear infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </>
        )}

        {condition === 'sunny' && (
          <div className="absolute top-16 right-16 w-40 h-40 opacity-20">
            <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse blur-xl"></div>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`ray-${i}`}
                className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-t from-yellow-200 to-transparent origin-bottom"
                style={{
                  transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                  animation: `sunRay 4s ease-in-out infinite ${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(180deg); }
          }
          @keyframes rainDrop {
            to { transform: translateY(100vh); opacity: 0; }
          }
          @keyframes sunRay {
            0%, 100% { opacity: 0.3; transform: translate(-50%, -100%) rotate(${0}deg) scale(1); }
            50% { opacity: 0.8; transform: translate(-50%, -100%) rotate(${0}deg) scale(1.3); }
          }
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {getAnimatedBackground(weather?.condition || 'default')}
      
      <div className="relative z-10">
        {/* Header with time */}
        <div className="container mx-auto px-6 pt-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-2 drop-shadow-2xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                SRI LANKA
              </h1>
              <p className="text-xl text-white/80 font-light tracking-wide">Weather Intelligence System</p>
            </div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-mono text-white/90 mb-1">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-sm text-white/70 uppercase tracking-wider">
                {currentTime.toLocaleDateString([], { weekday: 'long' })}
              </div>
            </div>
          </div>

          {/* Advanced Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" />
                <input
                  type="text"
                  placeholder="Search cities across the island..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-3xl bg-black/20 backdrop-blur-xl text-white text-lg placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {searchTerm && (
              <div className="mt-4 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden max-h-64 overflow-y-auto">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setSearchTerm('');
                    }}
                    className="w-full text-left px-6 py-4 text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-3 group"
                  >
                    <MapPin className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">{city}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Content */}
          {loading ? (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
              </div>
              <p className="text-white/80 mt-6 text-xl font-light">Analyzing atmospheric conditions...</p>
            </div>
          ) : error ? (
            <div className="text-center max-w-md mx-auto">
              <div className="bg-red-500/20 backdrop-blur-xl rounded-3xl p-8 border border-red-400/30">
                <Zap className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-white text-lg mb-6">{error}</p>
                <button
                  onClick={() => fetchWeather(selectedCity)}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          ) : weather ? (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Hero Weather Display */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Temperature */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/20 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 group">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <div className="flex items-center gap-4 mb-3">
                          <MapPin className="w-8 h-8 text-cyan-400" />
                          <h2 className="text-4xl font-bold text-white">{weather.city}</h2>
                        </div>
                        <p className="text-white/70 text-lg">{weather.country}</p>
                      </div>
                      <div className="group-hover:rotate-12 transition-transform duration-300">
                        {getWeatherIcon(weather.condition, "w-20 h-20")}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="text-8xl md:text-9xl font-black text-transparent bg-gradient-to-br from-white via-cyan-100 to-blue-200 bg-clip-text mb-4 leading-none">
                          {weather.temperature}°
                        </div>
                        <p className="text-2xl text-white/90 capitalize mb-2 font-light">
                          {weather.condition.replace('-', ' ')}
                        </p>
                        <p className="text-white/70 text-lg">
                          Feels like <span className="text-cyan-300 font-semibold">{weather.feelsLike}°C</span>
                        </p>
                      </div>

                      <div className="space-y-6">
                        {[
                          { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%`, color: 'text-blue-400' },
                          { icon: Wind, label: 'Wind Speed', value: `${weather.windSpeed} km/h`, color: 'text-gray-300' },
                          { icon: Eye, label: 'Visibility', value: `${weather.visibility} km`, color: 'text-purple-400' },
                          { icon: Gauge, label: 'Pressure', value: `${weather.pressure} hPa`, color: 'text-green-400' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-4 group/item hover:translate-x-2 transition-transform duration-200">
                            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur group-hover/item:bg-white/20 transition-colors">
                              <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <div>
                              <p className="text-white/60 text-sm uppercase tracking-wider">{item.label}</p>
                              <p className="text-white text-xl font-semibold">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Stats */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-2xl rounded-3xl p-6 border border-orange-300/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Sunrise className="w-6 h-6 text-orange-400" />
                      <span className="text-white/80 font-medium">UV Index</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{weather.uvIndex}</div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-red-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(weather.uvIndex / 11) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-2xl rounded-3xl p-6 border border-purple-300/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Activity className="w-6 h-6 text-purple-400" />
                      <span className="text-white/80 font-medium">Air Quality</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">Good</div>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map((dot) => (
                        <div key={dot} className={`w-3 h-3 rounded-full ${dot <= 3 ? 'bg-green-400' : 'bg-white/20'} transition-colors duration-300`}></div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-2xl rounded-3xl p-6 border border-blue-300/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Compass className="w-6 h-6 text-blue-400" />
                      <span className="text-white/80 font-medium">Wind Direction</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">NE</div>
                    <div className="text-white/60">North East</div>
                  </div>
                </div>
              </div>

              {/* Advanced 5-Day Forecast */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/20 shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Moon className="w-8 h-8 text-cyan-400" />
                  Extended Forecast
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {weather.forecast.map((day, index) => (
                    <div key={index} className="group hover:scale-105 transition-all duration-300">
                      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 text-center hover:bg-white/10 transition-colors">
                        <p className="text-white/80 font-semibold mb-4 uppercase tracking-wide text-sm">{day.day}</p>
                        <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                          {getWeatherIcon(day.condition, "w-12 h-12")}
                        </div>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-white">{day.high}°</p>
                          <p className="text-white/60">{day.low}°</p>
                        </div>
                        <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-1000"
                            style={{ width: `${((day.high - 20) / 15) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced City Selection */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/20 shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-8">Popular Destinations</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {['Colombo', 'Kandy', 'Galle', 'Negombo', 'Nuwara Eliya', 'Jaffna'].map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`group relative overflow-hidden p-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedCity === city 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25' 
                          : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      <div className="relative z-10">
                        <MapPin className="w-5 h-5 mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                        <span className="block text-sm">{city}</span>
                      </div>
                      {selectedCity === city && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8 px-6">
          <div className="inline-block bg-black/20 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20">
            <p className="text-white/60 font-light">© Chanaka Eshan 2025 | Advanced Weather Intelligence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;