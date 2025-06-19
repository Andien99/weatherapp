import { getWeather } from "./getUserWeatherData";
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Location could not be found");
  }
}

async function success(position) {
  await fetch("https://ipapi.co/json")
    .then(function (response) {
      response.json().then((jsonData) => {
        console.log(jsonData);
        const city = jsonData.city;
        const country = jsonData.country;
        getWeather(city, country);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function error() {
  alert("Sorry, no position available.");
}

export { getLocation };
