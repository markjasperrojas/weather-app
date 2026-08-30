import { getWeatherData, getTemperature } from './weather.js';

const form = document.querySelector('form');
const locationInput = document.getElementById('location');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const location = locationInput.value;

  const weatherData = await getWeatherData(location);
  const temperature = getTemperature(weatherData);

  console.log(temperature);

  locationInput.value = '';
});
