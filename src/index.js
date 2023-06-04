/* eslint-disable camelcase */
import "./styles.css";

// key 7d3bc585323a47ed8b482529232204

// get input from search bar
// get url from the input
// fetch url api
// get the response => json() (also returns a promise)

// https://api.weatherapi.com/v1/current.json?q=london

const searchBar = document.querySelector(".search-bar");

async function getForecast() {
  const searchValue = searchBar.value;

  const URL = `https://api.weatherapi.com/v1/forecast.json?key=7d3bc585323a47ed8b482529232204&q=${searchValue}&days=3&alerts=yes&aqi=yes`;

  try {
    const response = await fetch(URL, { mode: "cors" }); // fetch only throws an error if there's disconnection
    const data = await response.json();
    console.log(data);
    const { country, localtime, name: city } = data.location;

    // code for changing background
    const { code, text: current_condition } = data.current.condition;

    const { temp_c, feelslike_c, temp_f, feelslike_f, humidity } = data.current;

    // forecast for day - astro
    const { moonrise, moon_phase, sunrise, sunset } =
      data.forecast.forecastday[0].astro;

    const conditionForDay = data.forecast.forecastday[0].day.condition.text;

    const {
      daily_chance_of_rain,
      daily_chance_of_snow,
      avghumidity,
      avgtemp_c,
      avgtemp_f,
      maxtemp_c,
      mintemp_c,
      maxtemp_f,
      mintemp_f,
    } = data.forecast.forecastday[0].day;

    return {
      city,
      country,
      localtime,
      current_condition,
      code,
      temp_c,
      feelslike_c,
      temp_f,
      feelslike_f,
      humidity,
      moonrise,
      moon_phase,
      sunrise,
      sunset,
      conditionForDay,
      daily_chance_of_rain,
      daily_chance_of_snow,
      avgtemp_c,
      avgtemp_f,
      avghumidity,
      maxtemp_c,
      mintemp_c,
      maxtemp_f,
      mintemp_f,
    };
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

const info = document.querySelector(".info");
const condition = document.querySelector(".condition");
const city = document.querySelector(".city");
const localTime = document.querySelector(".local-time");
const tempC = document.querySelector(".tempC");
const country = document.querySelector(".country");
const humidity = document.querySelector(".humidity");
const tempSwitch = document.querySelector(".temp-switch");
const chanceOfRain = document.querySelector(".chance-of-rain");

async function renderData() {
  const data = await getForecast(); // personalized data

  condition.textContent = `${data.current_condition}`;

  city.textContent = `${data.city}`;

  country.textContent = `${data.country}`;

  localTime.textContent = `${data.localtime}`;

  tempC.textContent = `${data.temp_c} °C`;

  chanceOfRain.textContent = `${data.daily_chance_of_rain}%`;

  humidity.textContent = `${data.humidity}`;
  info.append(
    condition,
    city,
    country,
    localTime,
    tempC,
    chanceOfRain,
    humidity
  );

  tempSwitch.textContent = "show in Fahrenheit";
  //  const classes = tempSwitch.classList;

  const toggleTempDisplay = () => {
    if (tempC.className === "tempC") {
      tempC.textContent = `${data.temp_f} °F`;
      tempC.className = "tempF";
      tempSwitch.textContent = "show in Celsius";
    } else {
      tempC.textContent = `${data.temp_c} °C`;
      tempC.className = "tempC";
      tempSwitch.textContent = "show in Fahrenheit";
    }
  };

  tempSwitch.addEventListener("click", () => {
    toggleTempDisplay();
  });

  const background = document.querySelector("body");
  background.classList.add("background");

  switch (data.code) {
    case 1000:
      console.log("1000 sunny");
      background.className = "sunny";
      break;
    case 1003 || 1006 || 1009:
      background.className = "cloudy";
      console.log("cloudy");
      break;

    case 1030:
      background.className = "mist";
      console.log("mist");
      break;

    case 1063 ||
      1150 ||
      1153 ||
      1183 ||
      1186 ||
      1189 ||
      1192 ||
      1195 ||
      1198 ||
      1201:
      background.className = "rain";
      console.log("rain");
      break;
    case 1255 || 1258 || 1261 || 1264:
      background.className = "snow";
      console.log("snow");
      break;
    case 1273 || 1276 || 1279:
      background.className = "thunder";
      console.log("thunder");
      break;
    default:
      background.className = "sunny";
      console.log("default");
  }
}

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    renderData();
    searchBar.value = "";
  }
});
