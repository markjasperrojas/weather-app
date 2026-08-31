import { getWeatherData, getCurrentConditions } from './weather.js';

const form = document.querySelector('form');
const locationInput = document.getElementById('location');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const location = locationInput.value;

  const weatherData = await getWeatherData(location);
  const currentConditions = getCurrentConditions(weatherData);

  console.log(currentConditions.temperature);
  console.log(currentConditions.feelsLike);
  console.log(currentConditions.humidity);
  console.log(currentConditions.windSpeed);

  locationInput.value = '';
});
