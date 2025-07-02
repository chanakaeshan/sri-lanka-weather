// /api/weather.js

export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!lat || !lon) {
	return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
	const response = await fetch(url);
	if (!response.ok) {
	  return res.status(response.status).json({ error: 'Failed to fetch weather data.' });
	}
	const data = await response.json();
	res.status(200).json(data);
  } catch (error) {
	res.status(500).json({ error: 'Internal server error.' });
  }
}