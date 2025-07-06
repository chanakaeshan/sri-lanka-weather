"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Sun, Cloud, 
  CloudRain, CloudSnow, Zap, Activity, Compass, Sunrise, Sunset, Moon,
  Wifi, Cpu, BarChart3, TrendingUp, Layers, Globe
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
    'Nuwara Eliya', 'Ella', 'Sigiriya', 'Bentota' , 'Kalutara', 'Puttalam',
    'Gampaha', 'Kegalle', 'Mullaitivu', 'Kilinochchi', 'Ampara',
    'Monaragala', 'Dambulla', 'Weligama', 'Hikkaduwa', 'Pasikudah',
    'Arugam Bay', 'Beruwala', 'Tangalle', 'Ratnapura', 'Maharagama',
    'Dehiwala', 'Moratuwa', 'Mount Lavinia', 'Boralesgamuwa', 'Nugegoda',
    'Piliyandala', 'Maharagama', 'Homagama', 'Padukka', 'Avissawella', 
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
    const iconClass = `${size} drop-shadow-2xl transition-all duration-500 hover:scale-125 hover:rotate-12`;
    switch (condition) {
      case 'sunny': return <Sun className={`${iconClass} text-amber-300`} />;
      case 'cloudy': return <Cloud className={`${iconClass} text-slate-300`} />;
      case 'rainy': return <CloudRain className={`${iconClass} text-sky-300`} />;
      case 'partly-cloudy': return <Cloud className={`${iconClass} text-slate-200`} />;
      default: return <Sun className={`${iconClass} text-amber-300`} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Advanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950/30 via-slate-900/50 to-amber-950/20"></div>
        
        {/* Floating glass orbs */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              background: `radial-gradient(circle, ${
                Math.random() > 0.5 ? 'rgba(135, 206, 235, 0.1)' : 
                Math.random() > 0.5 ? 'rgba(255, 255, 224, 0.1)' : 'rgba(128, 128, 128, 0.1)'
              }, transparent)`,
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              animation: `float ${8 + Math.random() * 8}s ease-in-out infinite ${Math.random() * 4}s`
            }}
          />
        ))}

        {/* Neural network lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <g key={`line-${i}`}>
              <line
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="rgba(135, 206, 235, 0.3)"
                strokeWidth="0.5"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              <circle
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r="2"
                fill="rgba(255, 255, 224, 0.4)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            </g>
          ))}
        </svg>

        {/* Particle field */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-sky-200/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleFloat ${10 + Math.random() * 10}s linear infinite ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.7; }
          33% { transform: translateY(-30px) translateX(20px) scale(1.1); opacity: 1; }
          66% { transform: translateY(10px) translateX(-15px) scale(0.9); opacity: 0.8; }
        }
        @keyframes particleFloat {
          0% { transform: translateY(100vh) opacity(0); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) opacity(0); }
        }
        @keyframes glassShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes dataFlow {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}</style>
      
      <div className="relative z-10">
        {/* Futuristic Header */}
        <div className="container mx-auto px-6 pt-8">
          <div className="flex justify-between items-start mb-12">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400/20 to-amber-400/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-sky-300 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-6xl md:text-8xl font-black mb-2">
                  <span className="bg-gradient-to-r from-sky-300 via-slate-200 to-amber-300 bg-clip-text text-transparent">
                    WEATHER
                  </span>
                </h1>
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-sky-400"></div>
                  <p className="text-slate-400 font-light tracking-[0.3em] text-sm uppercase">
                    Neural Intelligence System
                  </p>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400"></div>
                </div>
              </div>
            </div>
            
            {/* Advanced Time Display */}
            <div className="relative">
              <div className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-3 h-3 bg-sky-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-400 text-xs uppercase tracking-wider">Live Time</span>
                </div>
                <div className="text-3xl font-mono text-white mb-1 font-light">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-slate-400 text-sm capitalize">
                  {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          </div>

          {/* Quantum Search Interface */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-slate-500/10 to-amber-500/20 rounded-[2rem] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-slate-900/30 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <Search className="w-6 h-6 text-sky-400" />
                  <span className="text-slate-300 text-sm uppercase tracking-wider">Global Search Protocol</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-sky-400/50 to-transparent"></div>
                  <Wifi className="w-5 h-5 text-amber-400 animate-pulse" />
                </div>
                <input
                  type="text"
                  placeholder="Enter city coordinates or search neural database..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-white text-xl placeholder-slate-500 border-none outline-none font-light"
                />
              </div>
            </div>

            {searchTerm && (
              <div className="mt-6 bg-slate-900/50 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                {filteredCities.map((city, index) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setSearchTerm('');
                    }}
                    className="w-full text-left px-8 py-5 text-white hover:bg-white/5 transition-all duration-300 flex items-center gap-4 group border-b border-white/5 last:border-b-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-amber-500/20 flex items-center justify-center backdrop-blur">
                      <MapPin className="w-5 h-5 text-sky-300 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-lg font-medium">{city}</span>
                      <div className="text-slate-400 text-sm">Sri Lanka • {Math.floor(Math.random() * 50 + 10)}km</div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-400 text-xs">ACTIVE</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Interface */}
          {loading ? (
            <div className="text-center py-32">
              <div className="relative inline-block mb-8">
                <div className="w-20 h-20 border-2 border-slate-700 rounded-full"></div>
                <div className="absolute inset-0 w-20 h-20 border-2 border-transparent border-t-sky-400 rounded-full animate-spin"></div>
                <div className="absolute inset-2 w-16 h-16 border-2 border-transparent border-t-amber-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                <div className="absolute inset-4 w-12 h-12 border-2 border-transparent border-t-slate-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
              </div>
              <p className="text-slate-300 text-xl font-light mb-2">Analyzing atmospheric data streams...</p>
              <p className="text-slate-500 text-sm">Neural network processing • Quantum algorithms active</p>
            </div>
          ) : error ? (
            <div className="text-center max-w-md mx-auto">
              <div className="bg-red-500/10 backdrop-blur-2xl rounded-3xl p-8 border border-red-400/20">
                <Zap className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-white text-lg mb-6">{error}</p>
                <button
                  onClick={() => fetchWeather(selectedCity)}
                  className="px-8 py-3 bg-gradient-to-r from-red-500/20 to-red-400/20 backdrop-blur text-white rounded-2xl hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 transform hover:scale-105 font-medium border border-red-400/30"
                >
                  Reconnect Neural Link
                </button>
              </div>
            </div>
          ) : weather ? (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Quantum Weather Display */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Primary Data Matrix */}
                <div className="lg:col-span-2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-slate-500/5 to-amber-500/10 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/10 shadow-2xl">
                      {/* Data Stream Header */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400/20 to-amber-400/20 backdrop-blur flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-sky-300" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-sky-400 rounded-full animate-pulse"></div>
                          </div>
                          <div>
                            <h2 className="text-4xl font-bold text-white mb-1">{weather.city}</h2>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">{weather.country}</span>
                              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                              <span className="text-slate-500 text-sm">LIVE</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {getWeatherIcon(weather.condition, "w-24 h-24")}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-12">
                        {/* Temperature Matrix */}
                        <div className="relative">
                          <div className="text-9xl font-black mb-4">
                            <span className="bg-gradient-to-br from-sky-200 via-white to-amber-200 bg-clip-text text-transparent">
                              {weather.temperature}
                            </span>
                            <span className="text-4xl text-slate-400 ml-2">°C</span>
                          </div>
                          <p className="text-2xl text-slate-300 capitalize mb-4 font-light">
                            {weather.condition.replace('-', ' ')}
                          </p>
                          <div className="flex items-center gap-3">
                            <Thermometer className="w-5 h-5 text-amber-400" />
                            <span className="text-slate-400">Feels like</span>
                            <span className="text-sky-300 font-semibold text-lg">{weather.feelsLike}°C</span>
                          </div>
                        </div>

                        {/* Sensor Data */}
                        <div className="space-y-6">
                          {[
                            { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%`, color: 'text-sky-400', bg: 'from-sky-500/10 to-sky-400/5' },
                            { icon: Wind, label: 'Wind Speed', value: `${weather.windSpeed} km/h`, color: 'text-slate-300', bg: 'from-slate-500/10 to-slate-400/5' },
                            { icon: Eye, label: 'Visibility', value: `${weather.visibility} km`, color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-400/5' },
                            { icon: Gauge, label: 'Pressure', value: `${weather.pressure} hPa`, color: 'text-sky-300', bg: 'from-sky-500/10 to-sky-300/5' }
                          ].map((item, index) => (
                            <div key={index} className="group/sensor flex items-center gap-5 hover:translate-x-3 transition-all duration-300">
                              <div className={`p-4 bg-gradient-to-br ${item.bg} backdrop-blur rounded-2xl border border-white/10 group-hover/sensor:scale-110 transition-transform`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                              </div>
                              <div className="flex-1">
                                <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">{item.label}</p>
                                <p className="text-white text-xl font-semibold">{item.value}</p>
                              </div>
                              <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-gradient-to-r ${item.color.replace('text-', 'from-')} to-transparent transition-all duration-1000`}
                                  style={{ width: `${Math.random() * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Analytics */}
                <div className="space-y-6">
                  {/* UV Index Pod */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                          <Sunrise className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <span className="text-white font-medium">UV Index</span>
                          <div className="text-slate-500 text-xs">Solar radiation</div>
                        </div>
                      </div>
                      <div className="text-5xl font-black text-white mb-4">{weather.uvIndex}</div>
                      <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(weather.uvIndex / 11) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Air Quality Monitor */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-emerald-500/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <span className="text-white font-medium">Air Quality</span>
                          <div className="text-slate-500 text-xs">PM2.5 • O3 • NO2</div>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-emerald-400 mb-4">Excellent</div>
                      <div className="flex gap-2">
                        {[1,2,3,4,5].map((dot) => (
                          <div key={dot} className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div className={`h-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-500 ${dot <= 4 ? 'w-full' : 'w-0'}`}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Wind Compass */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 to-sky-500/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 border border-white/10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500/20 to-sky-500/20 flex items-center justify-center">
                          <Compass className="w-5 h-5 text-slate-300 animate-spin" style={{ animationDuration: '3s' }} />
                        </div>
                        <div>
                          <span className="text-white font-medium">Wind Vector</span>
                          <div className="text-slate-500 text-xs">Direction • Velocity</div>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-slate-200 mb-2">NE</div>
                      <div className="text-slate-400">North East • {weather.windSpeed} km/h</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantum Forecast Matrix */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-slate-500/5 to-amber-500/10 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400/20 to-amber-400/20 backdrop-blur flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-sky-300" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Extended Forecast Matrix</h3>
                      <p className="text-slate-400">Neural prediction algorithm • 96.7% accuracy</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-400 text-sm">REAL-TIME</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {weather.forecast.map((day, index) => (
                      <div key={index} className="group/forecast hover:scale-105 transition-all duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/2 rounded-3xl blur-lg opacity-0 group-hover/forecast:opacity-100 transition-opacity"></div>
                          <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                            <div className="text-center">
                              <p className="text-slate-400 font-medium mb-4 uppercase tracking-wider text-xs">{day.day}</p>
                              <div className="flex justify-center mb-6 group-hover/forecast:scale-110 transition-transform duration-300">
                                {getWeatherIcon(day.condition, "w-12 h-12")}
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-2xl font-bold text-white">{day.high}°</span>
                                  <span className="text-slate-400">{day.low}°</span>
                                </div>
                                <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                                  <div 
                                    className="absolute inset-0 bg-gradient-to-r from-sky-400 to-amber-400 rounded-full transition-all duration-1000"
                                    style={{ width: `${((day.high - 20) / 15) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Neural City Selection Interface */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-slate-500/5 to-amber-500/10 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400/20 to-amber-400/20 backdrop-blur flex items-center justify-center">
                      <Layers className="w-6 h-6 text-sky-300" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Neural Location Grid</h3>
                      <p className="text-slate-400">Quantum-enabled destination selector</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {['Colombo', 'Kandy', 'Galle', 'Negombo', 'Nuwara Eliya', 'Jaffna'].map((city, index) => (
                      <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className={`group/city relative overflow-hidden transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                          selectedCity === city 
                            ? 'scale-105' 
                            : ''
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                          selectedCity === city 
                            ? 'bg-gradient-to-br from-sky-500/20 to-amber-500/20 border-sky-400/50 shadow-lg shadow-sky-500/10' 
                            : 'bg-slate-800/30 border-white/10 hover:bg-slate-700/40 hover:border-white/20'
                        }`}>
                          {/* Neural Grid Background */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="w-full h-full" style={{
                              backgroundImage: `
                                linear-gradient(rgba(135, 206, 235, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(135, 206, 235, 0.1) 1px, transparent 1px)
                              `,
                              backgroundSize: '8px 8px'
                            }}></div>
                          </div>

                          <div className="relative z-10 text-center">
                            <div className="mb-4 flex justify-center">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                selectedCity === city 
                                  ? 'bg-gradient-to-br from-sky-400/30 to-amber-400/30' 
                                  : 'bg-slate-700/50 group-hover/city:bg-slate-600/50'
                              }`}>
                                <MapPin className={`w-5 h-5 transition-all duration-300 group-hover/city:scale-110 ${
                                  selectedCity === city ? 'text-sky-300' : 'text-slate-400'
                                }`} />
                              </div>
                            </div>
                            <span className={`block text-sm font-medium transition-colors ${
                              selectedCity === city ? 'text-white' : 'text-slate-300'
                            }`}>{city}</span>
                            
                            {selectedCity === city && (
                              <div className="mt-2 flex justify-center">
                                <div className="flex gap-1">
                                  {[1,2,3].map((dot) => (
                                    <div 
                                      key={dot} 
                                      className="w-1 h-1 bg-sky-400 rounded-full animate-pulse"
                                      style={{ animationDelay: `${dot * 200}ms` }}
                                    ></div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Selection Indicator */}
                          {selectedCity === city && (
                            <div className="absolute top-2 right-2">
                              <div className="w-3 h-3 bg-sky-400 rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Quantum Footer */}
        <div className="text-center mt-20 pb-12 px-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-amber-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-slate-900/30 backdrop-blur-2xl rounded-3xl px-10 py-6 border border-white/10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
                <Cpu className="w-5 h-5 text-slate-400" />
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <p className="text-slate-400 font-light text-sm">
                © Chanaka Eshan 2025 | Quantum Weather Intelligence • Neural Network v4.2.1
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;