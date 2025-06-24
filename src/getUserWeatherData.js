import { weeklyForecast } from "./createWeeklyWeather";
import { hourlyForecast } from "./createHourlyWeather";
import { todayInfo } from "./createTodayInfo";
import { getHours } from "date-fns";
const hourlyWeatherContainer = document.getElementById("today-weather");
async function getWeather(geodata) {
  let city = geodata;
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=DJ8W563LE494DK5TTRSABLW5U`,
      { mode: "cors" }
    );
    const weather = await response.json();
    if (hourlyWeatherContainer.children.length > 5) {
      todayInfo.reset();
      hourlyForecast.reset();
      weeklyForecast.reset();
    }
    WeeklyForecast(weather);
    HourlyForecast(weather.days[1]);
    TodayWeather(weather, geodata);
  } catch (err) {
    console.error(err);
  }
}

function WeeklyForecast(weather) {
  let weeklyData = [];
  for (let i = 0; i < 7; i++) {
    weeklyData.push(weather.days[i]);
  }
  weeklyForecast.create(weeklyData);
}

function HourlyForecast(thisday) {
  let hourlyData = [];
  let currentTime = new Date();
  getHours(currentTime);
  for (let i = 0; i < 24; i++) {
    hourlyData.push(thisday.hours[i]);
  }
  hourlyForecast.create(hourlyData);
}

function TodayWeather(weather) {
  let todayWeather = weather.days[0];
  todayInfo.create(todayWeather, weather);
}

export { getWeather };
