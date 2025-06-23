import { convertDay, convertMonth } from "./findDayDate";
import { fetchIcon } from "../fetchIcon";
import { convertToCel } from "./convertUnits";
const todayInfoContainer = document.getElementById("today-info");
const toggleDegrees = document.getElementById("ms2");
function createTodayInfo(weather, geodata) {
  let todayWeather = weather;
  console.log(geodata);
  console.log(weather);
  //create nodes
  const content1 = document.createElement("div");
  const location = document.createElement("h1");
  const todayDate = document.createElement("p");
  const todayDescription = document.createElement("p");
  const content2 = document.createElement("div");
  const todayIcon = document.createElement("img");
  const tempInfoContainer = document.createElement("div");
  const todayTemp = document.createElement("h1");
  const todayTemp2Container = document.createElement("div");
  const todayMinMax = document.createElement("p");
  const feelsLike = document.createElement("p");
  //Provide classnames and id
  content1.className = "content1";
  location.className = "location";
  todayDate.className = "today-date";
  todayDescription.className = "description";
  content2.className = "content2";
  todayIcon.className = "today-icon";
  tempInfoContainer.className = "temp-info";
  todayTemp.className = "today-temp";
  todayTemp2Container.className = "today-temp2";
  todayMinMax.className = "todayminmax";
  feelsLike.className = "feelslike";
  //appending order
  todayInfoContainer.appendChild(content1);
  content1.appendChild(location);
  content1.appendChild(todayDate);
  content1.appendChild(todayDescription);
  todayInfoContainer.appendChild(content2);
  content2.appendChild(todayIcon);
  content2.appendChild(tempInfoContainer);
  tempInfoContainer.appendChild(todayTemp);
  tempInfoContainer.appendChild(todayTemp2Container);
  todayTemp2Container.appendChild(todayMinMax);
  todayTemp2Container.appendChild(feelsLike);
  //find todays date info
  let thisDay = convertDay(weather.datetime);
  let thisMonth = convertMonth(weather.datetime);
  //integrate element values into the NODES
  location.textContent =
    geodata.city + ", " + geodata.postal + ", " + geodata.country;
  todayDate.textContent =
    thisDay + ", " + weather.datetime.slice(5, 7) + " " + thisMonth;
  todayDescription.textContent = weather.description;
  fetchIcon(todayWeather.icon).then((weatherIcon) => {
    let thisIcon = weatherIcon.url;
    console.log(thisIcon);
    todayIcon.setAttribute("src", thisIcon);
  });
  todayTemp.textContent = todayWeather.temp + "°";
  todayMinMax.textContent =
    "max: " + todayWeather.tempmax + "° min: " + todayWeather.tempmin + "° ";
  feelsLike.textContent = "Feels like: " + todayWeather.feelslike + "° ";
  //toggle button to convert units
  toggleDegrees.addEventListener("click", () => {
    if (toggleDegrees.checked === true) {
      todayTemp.textContent = convertToCel(todayWeather.temp);
      todayMinMax.textContent =
        "max: " +
        convertToCel(todayWeather.tempmax) +
        " min: " +
        convertToCel(todayWeather.tempmin) +
        " ";
      feelsLike.textContent =
        "Feels like: " + convertToCel(todayWeather.feelslike) + " ";
    } else if (toggleDegrees.checked === false) {
      todayTemp.textContent = todayWeather.temp;
      todayMinMax.textContent =
        "max: " +
        todayWeather.tempmax +
        "° min: " +
        todayWeather.tempmin +
        "° ";
      feelsLike.textContent = "Feels like: " + todayWeather.feelslike + "° ";
    }
  });
}

export { createTodayInfo };
