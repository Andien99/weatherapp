async function getWeather(city, country) {
  console.log("User city is " + city + " and country is " + country);
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}?key=DJ8W563LE494DK5TTRSABLW5U`,
      { mode: "cors" }
    );
    const weather = await response.json();
    WeeklyForecast(weather);
    HourlyForecast(weather);
  } catch (err) {
    alert("getWeather() Error:" + err);
  }
}

function WeeklyForecast(weather) {
  console.log(weather.days);
}

function HourlyForecast(weather) {
  console.log(weather.days[0].hours);
}

export { getWeather };
