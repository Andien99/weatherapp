import { createWeeklyForecast } from "./createWeeklyWeather";
async function getWeather(city, country) {
  console.log("User city is " + city + " and country is " + country);
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}?key=DJ8W563LE494DK5TTRSABLW5U`,
      { mode: "cors" }
    );
    const weather = await response.json();
    WeeklyForecast(weather);
    // HourlyForecast(weather);
  } catch (err) {
    alert("getWeather() Error:" + err);
  }
}

function WeeklyForecast(weather) {
  let weeklyData = [];
  for (let i = 0; i < 7; i++) {
    weeklyData.push(weather.days[i]);
  }
  createWeeklyForecast(weeklyData);
}

// function HourlyForecast(weather) {
//   console.log(weather.days[0].hours);
//   let hourlyWeather = weather.days;
// }

export { getWeather };
