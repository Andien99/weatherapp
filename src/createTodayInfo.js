import { convertDay, convertMonth } from "./findDayDate";
import { fetchIcon } from "../fetchIcon";
import { convertToCel } from "./convertUnits";
const todayInfoContainer = document.getElementById("today-info");
const toggleDegrees = document.getElementById("ms2");
const todayInfo = (function () {
  //globally scoped nodes
  let content1;
  let location;
  let todayDate;
  let todayDescription;
  let content2;
  let todayIcon;
  let tempInfoContainer;
  let todayTemp;
  let todayTemp2Container;
  let todayMinMax;
  let feelsLike;
  let thisAddress;
  function create(weather, geodata = null) {
    if (geodata !== null) {
      thisAddress = geodata.resolvedAddress;
    }

    content1 = document.createElement("div");
    location = document.createElement("h1");
    todayDate = document.createElement("p");
    todayDescription = document.createElement("p");
    content2 = document.createElement("div");
    todayIcon = document.createElement("img");
    tempInfoContainer = document.createElement("div");
    todayTemp = document.createElement("h1");
    todayTemp2Container = document.createElement("div");
    todayMinMax = document.createElement("p");
    feelsLike = document.createElement("p");
    let todayWeather = weather;
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
    //integrate weather values into the nodes
    if (geodata !== null) {
      location.textContent = geodata.resolvedAddress;
    } else {
      location.textContent = thisAddress;
    }
    todayDate.textContent =
      thisDay + ", " + weather.datetime.slice(8, 10) + " " + thisMonth;
    todayDescription.textContent = weather.description;
    fetchIcon(todayWeather.icon).then((weatherIcon) => {
      todayIcon.setAttribute("src", weatherIcon.url);
      if (toggleDegrees.checked == true) {
        todayTemp.textContent = convertToCel(todayWeather.temp);
        todayMinMax.textContent =
          "max: " +
          convertToCel(todayWeather.tempmax) +
          " min: " +
          convertToCel(todayWeather.tempmin);
        feelsLike.textContent =
          "Feels like: " + convertToCel(todayWeather.feelslike);
      } else {
        todayTemp.textContent = todayWeather.temp + "°";
        todayMinMax.textContent =
          "max: " +
          todayWeather.tempmax +
          "° min: " +
          todayWeather.tempmin +
          "° ";
        feelsLike.textContent = "Feels like: " + todayWeather.feelslike + "° ";
      }
    });

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
        todayTemp.textContent = todayWeather.temp + "°";
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

  function resetTodayInfo() {
    if (content2 && content2.childNodes.length !== 0) {
      content2.removeChild(tempInfoContainer);
      content2.removeChild(todayIcon);
      todayInfoContainer.removeChild(content2);
    }
    if (content1 && content1.childNodes.length !== 0) {
      content1.removeChild(todayDate);
      content1.removeChild(todayDescription);
      todayInfoContainer.removeChild(content1);
    }
    if (tempInfoContainer && tempInfoContainer.childNodes.length !== 0) {
      tempInfoContainer.removeChild(todayTemp);
      tempInfoContainer.removeChild(todayTemp2Container);
    }
    if (todayTemp2Container && todayTemp2Container.childNodes.length !== 0) {
      todayTemp2Container.removeChild(todayMinMax);
      todayTemp2Container.removeChild(feelsLike);
    }
  }
  return { create: create, reset: resetTodayInfo };
})();

function createTodayInfo(weather, geodata) {}

export { todayInfo };
