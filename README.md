# Sri Lanka Weather App

A modern web application for viewing real-time and forecast weather data tailored for Sri Lanka. Built primarily with TypeScript, this project aims to provide users with accurate, up-to-date weather information through an intuitive and responsive interface.

## Features

- **Current Weather:** View real-time weather conditions for cities and regions across Sri Lanka.
- **Forecasts:** Access short-term and long-term weather forecasts.
- **Search & Filter:** Quickly find weather data for specific locations.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **API Integration:** Fetches weather data from trusted third-party providers.

## Technologies Used

- **TypeScript:** Main programming language for type safety and maintainability.
- **JavaScript:** For additional scripting needs.
- **CSS:** Styling and responsive layout.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chanakaeshan/sri-lanka-weather.git
   cd sri-lanka-weather
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm start
   ```
4. **Open in your browser:**  
   Visit `http://localhost:3000` (or as specified in your terminal) to view the app.

## Configuration

- To fetch live weather data, you may need an API key from a weather provider such as [OpenWeatherMap](https://openweathermap.org/api).
- Create a `.env` file in the project root and add your API key:
  ```
  REACT_APP_WEATHER_API_KEY=your_api_key_here
  ```

## Project Structure

```
src/
  components/      # UI components
  services/        # API service calls
  utils/           # Utility functions and helpers
  styles/          # CSS and style files
  App.tsx          # Main application component
  index.tsx        # Application entry point
```

## Challenges

- Handling API rate-limiting and downtime.
- Ensuring localisation for Sri Lankan users.
- Mapping weather data accurately to specific Sri Lankan locations.
- Providing a fast and smooth user experience on mobile networks.

## References

- [OpenWeatherMap API](https://openweathermap.org/api)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Sri Lanka Department of Meteorology](http://www.meteo.gov.lk/)

## License

MIT License

---

*This project is maintained by [chanakaeshan](https://github.com/chanakaeshan). Contributions are welcome!*
