async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=SKYRQFC5MDWFR9VM75TG6ZK9C`,
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

export { getWeatherData, getTemperature };
