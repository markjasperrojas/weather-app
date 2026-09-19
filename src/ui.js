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

  const unitToggle = document.createElement('label');
  unitToggle.classList.add('unit-toggle');
  unitToggle.htmlFor = 'toggle-btn';
  unitToggle.setAttribute('aria-label', 'Switch temperature unit');

  const toggleBtn = document.createElement('input');
  toggleBtn.type = 'checkbox';
  toggleBtn.id = 'toggle-btn';

  const celsiusLabel = document.createElement('span');
  celsiusLabel.classList.add('unit-toggle__option');
  celsiusLabel.textContent = '°C';

  const fahrenheitLabel = document.createElement('span');
  fahrenheitLabel.classList.add('unit-toggle__option');
  fahrenheitLabel.textContent = '°F';
  const temperatureElement = document.createElement('p');
  temperatureElement.classList.add('temperature');

  const feelsLikeIcon = document.createElement('img');
  feelsLikeIcon.src = feelsLikeImage;
  const feelsLikeDiv = document.createElement('div');
  feelsLikeDiv.classList.add('condition-div');
  const feelsLikeLabel = document.createElement('p');
  feelsLikeLabel.textContent = 'Feels like';
  const feelsLikeElement = document.createElement('span');
  const feelsLikeInnerDiv = document.createElement('div');

  const windSpeedIcon = document.createElement('img');
  windSpeedIcon.src = windImage;
  const windSpeedDiv = document.createElement('div');
  windSpeedDiv.classList.add('condition-div');
  const windSpeedLabel = document.createElement('p');
  windSpeedLabel.textContent = 'Wind speed';
  const windSpeedElement = document.createElement('span');
  const windSpeedInnerDiv = document.createElement('div');

  const humidityIcon = document.createElement('img');
  humidityIcon.src = humidityImage;
  const humidityDiv = document.createElement('div');
  humidityDiv.classList.add('condition-div');
  const humidityLabel = document.createElement('p');
  humidityLabel.textContent = 'Humidity';
  const humidityElement = document.createElement('span');
  const humidityInnerDiv = document.createElement('div');

  const addressElement = document.createElement('p');
  addressElement.classList.add('address');

  const timeZoneElement = document.createElement('p');
  timeZoneElement.classList.add('timezone');

  const statusImage = document.createElement('img');
  statusImage.src = sunImage;

  temperatureElement.textContent = `${currentConditions.temperature}`;
  feelsLikeElement.textContent = `${currentConditions.feelsLike}°C`;
  humidityElement.textContent = `${currentConditions.humidity}%`;
  windSpeedElement.textContent = `${currentConditions.windSpeed} km/h`;

  addressElement.textContent = `${timeAndAddress.resolvedAddress.toUpperCase()}`;
  timeZoneElement.textContent = `${timeAndAddress.timeZone}`;

  toggleBtn.addEventListener('change', () => {
    if (currentUnit === 'celsius') {
      currentUnit = 'fahrenheit';

      const temperature = convertToFahrenheit(currentConditions.temperature);
      const feelsLike = convertToFahrenheit(currentConditions.feelsLike);
      const windSpeed = convertToMph(currentConditions.windSpeed);

      temperatureElement.textContent = `${temperature}`;
      feelsLikeElement.textContent = `${feelsLike}°F`;
      windSpeedElement.textContent = `${windSpeed} mph`;
    } else {
      currentUnit = 'celsius';

      temperatureElement.textContent = `${currentConditions.temperature}`;
      feelsLikeElement.textContent = `${currentConditions.feelsLike}°C`;
      windSpeedElement.textContent = `${currentConditions.windSpeed} km/h`;
    }
  });

  div1.appendChild(addressElement);
  div1.appendChild(timeZoneElement);
  innerDiv1.appendChild(statusImage);
  innerDiv1.appendChild(temperatureElement);
  div1.appendChild(innerDiv1);
  informationDiv.appendChild(div1);

  feelsLikeDiv.appendChild(feelsLikeIcon);
  feelsLikeInnerDiv.appendChild(feelsLikeLabel);
  feelsLikeInnerDiv.appendChild(feelsLikeElement);
  feelsLikeDiv.appendChild(feelsLikeInnerDiv);

  windSpeedDiv.appendChild(windSpeedIcon);
  windSpeedInnerDiv.appendChild(windSpeedLabel);
  windSpeedInnerDiv.appendChild(windSpeedElement);
  windSpeedDiv.appendChild(windSpeedInnerDiv);

  humidityDiv.appendChild(humidityIcon);
  humidityInnerDiv.appendChild(humidityLabel);
  humidityInnerDiv.appendChild(humidityElement);
  humidityDiv.appendChild(humidityInnerDiv);

  div2.appendChild(feelsLikeDiv);
  div2.appendChild(humidityDiv);
  div2.appendChild(windSpeedDiv);
  informationDiv.appendChild(div2);

  unitToggle.appendChild(toggleBtn);
  unitToggle.appendChild(celsiusLabel);
  unitToggle.appendChild(fahrenheitLabel);
  toggleDiv.appendChild(unitToggle);
}

function convertToFahrenheit(celsius) {
  return (celsius * 1.8 + 32).toFixed(2);
}

function convertToMph(kmh) {
  return (kmh * 0.621371).toFixed(2);
}
