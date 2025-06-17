import { getDay } from "date-fns";
const weeklyWeatherContainer = document.getElementById("weekly-weather");

function createWeeklyForecast(weather) {
  let cityWeather = weather;
  console.log(cityWeather);
  for (let i = 0; i < 7; i++) {
    //Basic day elements
    let dayContainer = document.createElement("div");
    let dayLabel = document.createElement("p");
    let dayWeatherIcon = document.createElement("img");
    let dayTempContainer = document.createElement("div");
    let dayTemp = document.createElement("p");
    //Classes for each node
    dayContainer.className = "day";
    dayLabel.className = "day-label";
    dayWeatherIcon.className = "weather-icon";
    dayTempContainer.className = "temp-container";
    dayTemp.className = "temp";
    //appending sequence
    weeklyWeatherContainer.appendChild(dayContainer);
    dayContainer.appendChild(dayLabel);
    dayContainer.appendChild(dayWeatherIcon);
    dayContainer.appendChild(dayTempContainer);
    dayTempContainer.appendChild(dayTemp);
    //Gets the name of today's date
    let thisDay = convertDay(cityWeather[i].datetime);
    //Gets animated SVG to match weather description
    fetchIcon(cityWeather[i].icon);
    async function fetchIcon(icon) {
      //fetches the appropriate SVG from bmcdn.nl/assets
      try {
        let response = await fetch(
          `https://bmcdn.nl/assets/weather-icons/v2.0/fill/${icon}.svg`,
          { mode: "cors" }
        );
        dayWeatherIcon.setAttribute("src", response.url);
      } catch (err) {
        throw Error(err);
      }
    }
    //Integrate the weekly data to the Nodes
    dayLabel.textContent = thisDay;
    dayTemp.textContent =
      cityWeather[i].tempmax + "°" + " / " + cityWeather[i].tempmin + "°";
  }
}

function convertDay(day) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[getDay(day)];
}

export { createWeeklyForecast };
