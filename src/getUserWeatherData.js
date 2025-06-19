import { createWeeklyForecast } from "./createWeeklyWeather";
import { createHourlyForecast } from "./createHourlyWeather";
import { getHours } from "date-fns";
async function getWeather(city, country) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}?key=DJ8W563LE494DK5TTRSABLW5U`,
      { mode: "cors" }
    );
    const weather = await response.json();
    WeeklyForecast(weather);
    HourlyForecast(weather);
  } catch (err) {
    console.error(err);
  }
}

function WeeklyForecast(weather) {
  let weeklyData = [];
  for (let i = 0; i < 7; i++) {
    weeklyData.push(weather.days[i]);
  }
  createWeeklyForecast(weeklyData);
}

function HourlyForecast(weather) {
  let hourlyData = [];
  let currentTime = new Date();
  getHours(currentTime);
  for (let i = 0; i < 12; i++) {
    if (weather.days[0].hours[i + getHours(currentTime)] == undefined) {
      let remainingHours = 12 - i;
      for (let j = 0; j < remainingHours; j++) {
        hourlyData.push(weather.days[1].hours[j]);
      }
    } else {
      hourlyData.push(weather.days[0].hours[i + getHours(currentTime)]);
    }
  }
  createHourlyForecast(hourlyData);
}

export { getWeather };
