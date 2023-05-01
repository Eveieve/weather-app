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

    const { country, localtime, name: city } = data.location;

    const current_condition = data.current.condition.text;
    const { temp_c, feelslike_c, temp_f, feelslike_f, current_humidity } =
      data.current;

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
      temp_c,
      feelslike_c,
      temp_f,
      feelslike_f,
      current_humidity,
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
const weatherData = await getForecast();

const info = document.querySelector(".info");

function renderData(data) {
  const condition = document.createElement("div");
  condition.textContent = `${data.current_condition}`;

  const city = document.createElement("div");
  city.textContent = `${data.city}`;

  const country = document.createElement("div");
  country.textContent = `${data.country}`;
  const localTime = document.createElement("div");
  localTime.textContent = `${data.localtime}`;

  const tempC = document.createElement("div");
  tempC.textContent = `${data.temp_c}`;

  const chanceOfRain = document.createElement("div");
  chanceOfRain.textContent = `${data.daily_chance_of_rain}`;

  info.append(condition, city, country, localTime, tempC, chanceOfRain);

  // right side
  // const feelsLikeC = document.createElement("div");
  // feelsLikeC.textContent = `${data.feelslike_c}`;

  // info.append(feelsLikeC);
  // feelslike_c
  // current_humidity
}

function changeBackground(data) {
  // if data is data.current_condition.code === 1000
  // upload sunny/clear image
  // else if data.current_condition.code
  // else if data.current_condition.code === 1003 || 1006 || 1009
  // upload cloudy image
  // else if data.current_condition.code === 1114 || 1117 ||
  switch (data.current_condition.code) {
    case 1000:
      console.log("1000 sunny");
      // sunny image
      // have a background node element have a sunny image class
      // set a corresponding class in css
      break;
    case 1003 || 1006 || 1009:
      console.log("cloudy");
      break;

    default:
      // statement
      console.log("default");
  }
}

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    renderData(weatherData);
    changeBackground(weatherData);
  }
});
