export function renderInformation(currentConditions) {
  let currentUnit = 'celsius';
  const informationDiv = document.querySelector('.information');

  informationDiv.innerHTML = '';

  const toggleBtn = document.createElement('button');
  const temperatureElement = document.createElement('p');
  const feelsLikeElement = document.createElement('p');
  const humidityElement = document.createElement('p');
  const windSpeedElement = document.createElement('p');

  toggleBtn.textContent = '°C / °F';
  temperatureElement.textContent = `Temperature: ${currentConditions.temperature}°C`;
  feelsLikeElement.textContent = `Feels like: ${currentConditions.feelsLike}°C`;
  humidityElement.textContent = `Humidity: ${currentConditions.humidity}%`;
  windSpeedElement.textContent = `Wind speed: ${currentConditions.windSpeed} km/h`;

  toggleBtn.addEventListener('click', () => {
    if (currentUnit === 'celsius') {
      currentUnit = 'fahrenheit';

      const temperature = convertToFahrenheit(currentConditions.temperature);
      const feelsLike = convertToFahrenheit(currentConditions.feelsLike);
      const windSpeed = convertToMph(currentConditions.windSpeed);

      temperatureElement.textContent = `Temperature: ${temperature}°F`;
      feelsLikeElement.textContent = `Feels like: ${feelsLike}°F`;
      windSpeedElement.textContent = `Wind speed: ${windSpeed} mph`;
    } else {
      currentUnit = 'celsius';

      temperatureElement.textContent = `Temperature: ${currentConditions.temperature}°C`;
      feelsLikeElement.textContent = `Feels like: ${currentConditions.feelsLike}°C`;
      windSpeedElement.textContent = `Wind speed: ${currentConditions.windSpeed} km/h`;
    }
  });

  informationDiv.appendChild(toggleBtn);
  informationDiv.appendChild(temperatureElement);
  informationDiv.appendChild(feelsLikeElement);
  informationDiv.appendChild(humidityElement);
  informationDiv.appendChild(windSpeedElement);
}

function convertToFahrenheit(celsius) {
  return celsius * 1.8 + 32;
}

function convertToMph(kmh) {
  return Math.round(kmh * 0.621371);
}
