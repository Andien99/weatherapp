import { getDay } from "date-fns";
import { convertToCel, convertToFah } from "./convertUnits";
import { convertDay } from "./findDayDate";
import { fetchIcon } from "../fetchIcon";
import { todayInfo } from "./createTodayInfo";
import { hourlyForecast } from "./createHourlyWeather";
const toggleDegrees = document.getElementById("ms2");
const weeklyWeatherContainer = document.getElementById("weekly-weather");

const weeklyForecast = (function () {
  function create(weather) {
    let cityWeather = weather;
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
      fetchIcon(cityWeather[i].icon).then((weatherIcon) => {
        let thisIcon = weatherIcon.url;
        dayWeatherIcon.setAttribute("src", thisIcon);
      });
      //Integrate the weekly data to the Nodes
      dayLabel.textContent = thisDay;

      if (toggleDegrees.checked == true) {
        dayTemp.textContent =
          convertToCel(cityWeather[i].tempmax) +
          " / " +
          convertToCel(cityWeather[i].tempmin);
      } else {
        dayTemp.textContent =
          Math.round(cityWeather[i].tempmax) +
          "°" +
          " / " +
          Math.round(cityWeather[i].tempmin) +
          "°";
      }

      //stores dayTemp value in the toggle button event listener
      toggleDegrees.addEventListener("click", () => {
        let newTempLabel = dayTemp;
        let thisTempMin = cityWeather[i].tempmin;
        let thisTempMax = cityWeather[i].tempmax;
        if (toggleDegrees.checked === true) {
          newTempLabel.textContent = convertToCel(thisTempMin, thisTempMax);
        } else if (toggleDegrees.checked === false) {
          newTempLabel.textContent = convertToFah(thisTempMin, thisTempMax);
        }
      });

      //add button that will change weather hour and today weather accordingly
      dayContainer.addEventListener("click", () => {
        const thisDayInfo = cityWeather[i];
        console.log(thisDayInfo);
        todayInfo.reset();
        todayInfo.create(thisDayInfo);
        hourlyForecast.reset();
        hourlyForecast.create(thisDayInfo.hours);
      });
    }
  }

  function reset() {
    console.log("evoked");
    for (let i = 0; i < 7; i++) {
      let dayDiv = weeklyWeatherContainer.firstChild;
      weeklyWeatherContainer.removeChild(dayDiv);
    }
  }
  return { create: create, reset: reset };
})();

// function createWeeklyForecast(weather) {}

export { weeklyForecast };
