import sunImage from './assets/sun.png';
import feelsLikeImage from './assets/feels-like.png';
import windImage from './assets/wind.png';
import humidityImage from './assets/humidity.png';

export function renderInformation(currentConditions, timeAndAddress) {
  let currentUnit = 'celsius';
  const informationDiv = document.querySelector('.information');
  const toggleDiv = document.querySelector('.toggle');

  informationDiv.innerHTML = '';
  toggleDiv.innerHTML = '';

  const div1 = document.createElement('div');
  const innerDiv1 = document.createElement('div');
  div1.classList.add('div1');

  const div2 = document.createElement('div');
  div2.classList.add('div2');

  const toggleBtn = document.createElement('button');
  const temperatureElement = document.createElement('p');
  temperatureElement.classList.add('temperature');

  const feelsLikeIcon = document.createElement('img');
  feelsLikeIcon.src = feelsLikeImage;
  const feelsLikeDiv = document.createElement('div');
  const feelsLikeElement = document.createElement('p');

  const windSpeedIcon = document.createElement('img');
  windSpeedIcon.src = windImage;
  const windSpeedDiv = document.createElement('div');
  const windSpeedElement = document.createElement('p');

  const humidityIcon = document.createElement('img');
  humidityIcon.src = humidityImage;
  const humidityDiv = document.createElement('div');
  const humidityElement = document.createElement('p');

  const addressElement = document.createElement('p');
  addressElement.classList.add('address');

  const timeZoneElement = document.createElement('p');
  timeZoneElement.classList.add('timezone');

  const statusImage = document.createElement('img');
  statusImage.src = sunImage;

  toggleBtn.textContent = '°C / °F';
  temperatureElement.textContent = `${currentConditions.temperature}`;
  feelsLikeElement.textContent = `Feels like: ${currentConditions.feelsLike}°C`;
  humidityElement.textContent = `Humidity: ${currentConditions.humidity}%`;
  windSpeedElement.textContent = `Wind speed: ${currentConditions.windSpeed} km/h`;

  addressElement.textContent = `${timeAndAddress.resolvedAddress.toUpperCase()}`;
  timeZoneElement.textContent = `${timeAndAddress.timeZone}`;

  toggleBtn.addEventListener('click', () => {
    if (currentUnit === 'celsius') {
      currentUnit = 'fahrenheit';

      const temperature = convertToFahrenheit(currentConditions.temperature);
      const feelsLike = convertToFahrenheit(currentConditions.feelsLike);
      const windSpeed = convertToMph(currentConditions.windSpeed);

      temperatureElement.textContent = `${temperature}`;
      feelsLikeElement.textContent = `Feels like: ${feelsLike}°F`;
      windSpeedElement.textContent = `Wind speed: ${windSpeed} mph`;
    } else {
      currentUnit = 'celsius';

      temperatureElement.textContent = `${currentConditions.temperature}`;
      feelsLikeElement.textContent = `Feels like: ${currentConditions.feelsLike}°C`;
      windSpeedElement.textContent = `Wind speed: ${currentConditions.windSpeed} km/h`;
    }
  });

  div1.appendChild(addressElement);
  div1.appendChild(timeZoneElement);
  innerDiv1.appendChild(statusImage);
  innerDiv1.appendChild(temperatureElement);
  div1.appendChild(innerDiv1);
  informationDiv.appendChild(div1);

  feelsLikeDiv.appendChild(feelsLikeIcon);
  feelsLikeDiv.appendChild(feelsLikeElement);

  windSpeedDiv.appendChild(windSpeedIcon);
  windSpeedDiv.appendChild(windSpeedElement);

  humidityDiv.appendChild(humidityIcon);
  humidityDiv.appendChild(humidityElement);

  div2.appendChild(feelsLikeDiv);
  div2.appendChild(humidityDiv);
  div2.appendChild(windSpeedDiv);
  informationDiv.appendChild(div2);

  toggleDiv.appendChild(toggleBtn);
}

function convertToFahrenheit(celsius) {
  return (celsius * 1.8 + 32).toFixed(2);
}

function convertToMph(kmh) {
  return (kmh * 0.621371).toFixed(2);
}
