import "./styles.css";

// key 7d3bc585323a47ed8b482529232204

// get input from search bar
// get url from the input
// fetch url api
// get the response => json() (also returns a promise)

// https://api.weatherapi.com/v1/current.json?q=london

const searchBar = document.querySelector(".search-bar");

async function getCurrentWeather() {
  // current weather
  const searchValue = searchBar.value;

  try {
    const URL = `https://api.weatherapi.com/v1/current.json?key=7d3bc585323a47ed8b482529232204&q=${searchValue}`;
    const response = await fetch(URL, { mode: "cors" });
    const data = await response.json();
    console.log(data);
    console.log(data.current.condition.text); // partly cloudy
    console.log(data.current.feelslike_c);
    console.log(data.current.feelslike_f);
    console.log();
  } catch (error) {
    console.error(error); // couldn't fetch API?
  }
}

async function getForecast() {
  const searchValue = searchBar.value;

  const URL = `https://api.weatherapi.com/v1/forecast.json?key=7d3bc585323a47ed8b482529232204&q=${searchValue}`;

  const response = await fetch(URL, { mode: "cors" });
  const data = await response.json();
  console.log(data);
}

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    getCurrentWeather();
    getForecast();
  }
});
