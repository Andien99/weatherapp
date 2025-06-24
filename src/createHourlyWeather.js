import { convertToCel, convertToFah } from "./convertUnits";
import { fetchIcon } from "../fetchIcon";
const hourlyWeatherContainer = document.getElementById("today-weather");
const toggleDegrees = document.getElementById("ms2");

const hourlyForecast = (function () {
  let hourContainer;
  function create(weather) {
    let hourlyWeather = weather;
    console.log(hourlyWeather);
    for (let i = 0; i < 24; i++) {
      //basic hourly elements
      hourContainer = document.createElement("div");
      let hourTime = document.createElement("div");
      let hourIcon = document.createElement("img");
      let hourTemp = document.createElement("div");
      let hourWind = document.createElement("div");
      let hourUV = document.createElement("div");
      //assigning class names to nodes
      hourContainer.className = "hourly-weather";
      hourTime.className = "time";
      hourIcon.className = "hourly-icon";
      hourTemp.className = "hourly-temp";
      hourWind.className = "hourly-wind";
      hourUV.className = "hourly-UV";
      //Appending Sequence
      hourlyWeatherContainer.appendChild(hourContainer);
      hourContainer.appendChild(hourTime);
      hourContainer.appendChild(hourIcon);
      hourContainer.appendChild(hourTemp);
      hourContainer.appendChild(hourWind);
      hourContainer.appendChild(hourUV);
      //convert 24HR time to AM/PM
      let reformattedTime = hourlyWeather[i].datetime.slice(0, 2);
      if (reformattedTime > 11) {
        if (reformattedTime !== "12") {
          reformattedTime = (parseInt(reformattedTime) - 12).toString() + "PM";
        } else {
          reformattedTime = parseInt(reformattedTime).toString() + "PM";
        }
      } else if (reformattedTime == "00") {
        reformattedTime = (parseInt(reformattedTime) + 12).toString() + "AM";
      } else if (reformattedTime < 10) {
        reformattedTime = reformattedTime.slice(1, 2) + "AM";
      } else {
        reformattedTime = reformattedTime + "AM";
      }
      //Gets animated SVG to match weather description
      fetchIcon(hourlyWeather[i].icon).then((weatherIcon) => {
        let thisIcon = weatherIcon.url;
        hourIcon.setAttribute("src", thisIcon);
      });
      //Integrating data to the Nodes
      hourTime.textContent = reformattedTime;
      if (toggleDegrees.checked == true) {
        hourTemp.textContent = convertToCel(hourlyWeather[i].temp);
      } else {
        hourTemp.textContent = Math.round(hourlyWeather[i].temp) + "°";
      }

      hourWind.textContent = hourlyWeather[i].windspeed + " kmph";
      hourUV.textContent = "UV " + hourlyWeather[i].uvindex;

      //stores hourTemp value in the toggle button event listener
      toggleDegrees.addEventListener("click", () => {
        let newTempLabel = hourTemp;
        let thisTemp = hourlyWeather[i].temp;
        if (toggleDegrees.checked === true) {
          newTempLabel.textContent = convertToCel(thisTemp);
        } else if (toggleDegrees.checked === false) {
          newTempLabel.textContent = convertToFah(thisTemp);
        }
      });
    }
  }
  function reset() {
    for (let i = 0; i < 24; i++) {
      let hourDiv = hourlyWeatherContainer.firstChild;
      if (hourlyWeatherContainer && hourlyWeatherContainer.parentNode) {
        hourlyWeatherContainer.removeChild(hourDiv);
      }
    }
  }
  return { create: create, reset: reset };
})();

export { hourlyForecast };
