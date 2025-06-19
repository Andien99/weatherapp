import { convertToCel, convertToFah } from "./convertUnits";
const hourlyWeatherContainer = document.getElementById("today-weather");
const toggleDegrees = document.getElementById("ms2");
function createHourlyForecast(weather) {
  let hourlyWeather = weather;
  for (let i = 0; i < 12; i++) {
    //basic hourly elements
    let hourContainer = document.createElement("div");
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
    if (reformattedTime > 12) {
      reformattedTime = (parseInt(reformattedTime) - 12).toString() + "PM";
    } else if (reformattedTime < 10) {
      reformattedTime = reformattedTime.slice(1, 2) + "AM";
    } else {
      reformattedTime = reformattedTime + "AM";
    }
    //Gets animated SVG to match weather description
    fetchIcon(hourlyWeather[i].icon);
    async function fetchIcon(icon) {
      //fetches the appropriate SVG from bmcdn.nl/assets
      try {
        let response = await fetch(
          `https://bmcdn.nl/assets/weather-icons/v2.0/fill/${icon}.svg`,
          { mode: "cors" }
        );
        hourIcon.setAttribute("src", response.url);
      } catch (err) {
        throw Error(err);
      }
    }
    //Integrating data to the Nodes
    hourTime.textContent = reformattedTime;
    hourTemp.textContent = Math.round(hourlyWeather[i].temp) + "°";
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

export { createHourlyForecast };
