import "./style.css";
import { getLocation } from "./getUserGeoLocation";
import { getWeather } from "./getUserWeatherData";
import { getCatGif } from "./catGif";

getLocation();
getCatGif();
const searchBar = document.getElementById("search");
searchBar.addEventListener("change", () => {
  getWeather(searchBar.value);
});
