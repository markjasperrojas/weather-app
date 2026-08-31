export function renderInformation(currentConditions) {
  const informationDiv = document.querySelector('.information');

  informationDiv.innerHTML = '';

  const temperatureElement = document.createElement('p');
  const feelsLikeElement = document.createElement('p');
  const humidityElement = document.createElement('p');
  const windSpeedElement = document.createElement('p');

  temperatureElement.textContent = `Temperature: ${currentConditions.temperature}°C`;
  feelsLikeElement.textContent = `Feels like: ${currentConditions.feelsLike}°C`;
  humidityElement.textContent = `Humidity: ${currentConditions.humidity}%`;
  windSpeedElement.textContent = `Wind speed: ${currentConditions.windSpeed} km/h`;

  informationDiv.appendChild(temperatureElement);
  informationDiv.appendChild(feelsLikeElement);
  informationDiv.appendChild(humidityElement);
  informationDiv.appendChild(windSpeedElement);
}
