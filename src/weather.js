async function getWeatherData(location) {
  try {
    const response = await fetch(
      // Remove "unitGroup=metric&" if you want Fahrenheit instead of Celsius.
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=SKYRQFC5MDWFR9VM75TG6ZK9C`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

function getTemperature(data) {
  return data.currentConditions.temp;
}

function getFeelsLike(data) {
  return data.currentConditions.feelslike;
}

function getHumidity(data) {
  return data.currentConditions.humidity;
}

function getWindSpeed(data) {
  return data.currentConditions.windspeed;
}

function getResolvedAddress(data) {
  return data.resolvedAddress;
}

function getTimeZone(data) {
  return data.timezone;
}

function getCurrentConditions(data) {
  const temperature = getTemperature(data);
  const feelsLike = getFeelsLike(data);
  const humidity = getHumidity(data);
  const windSpeed = getWindSpeed(data);

  return {
    temperature,
    feelsLike,
    humidity,
    windSpeed,
  };
}

function getAddressAndTimeZone(data) {
  const resolvedAddress = getResolvedAddress(data);
  const timeZone = getTimeZone(data);

  return {
    resolvedAddress,
    timeZone,
  };
}

export { getWeatherData, getCurrentConditions, getAddressAndTimeZone };
