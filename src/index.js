import { getWeatherData, getCurrentConditions } from './weather.js';
import { renderInformation } from './ui.js';

const form = document.querySelector('form');
const locationInput = document.getElementById('location');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const location = locationInput.value;

  const weatherData = await getWeatherData(location);
  const currentConditions = getCurrentConditions(weatherData);

  renderInformation(currentConditions);

  locationInput.value = '';
});
