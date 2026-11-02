import './styles.css';
import {
  getWeatherData,
  getCurrentConditions,
  getAddressAndTimeZone,
} from './weather.js';
import { renderInformation, renderError } from './ui.js';

const form = document.querySelector('form');
const locationInput = document.getElementById('location');

let latestRequestId = 0;

async function loadLocation(location) {
  const requestId = ++latestRequestId;

  try {
    const weatherData = await getWeatherData(location);

    if (requestId !== latestRequestId) return false;

    const currentConditions = getCurrentConditions(weatherData);
    const timeAndAddress = getAddressAndTimeZone(weatherData);

    renderInformation(currentConditions, timeAndAddress);
    return true;
  } catch (error) {
    if (requestId !== latestRequestId) return false;

    const message =
      error instanceof TypeError
        ? 'Network error. Please check your connection and try again.'
        : error.message;
    renderError(message);
    return false;
  }
}

loadLocation('ormoc');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const succeeded = await loadLocation(locationInput.value.trim());

  if (succeeded) {
    locationInput.value = '';
  }
});
