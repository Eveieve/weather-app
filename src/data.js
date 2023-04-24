// key 7d3bc585323a47ed8b482529232204

// get input from search bar
// get url from the input
// fetch url api
// get the response => json() (also returns a promise)

// https://api.weatherapi.com/v1/current.json?q=london

const searchBar = document.querySelector(".search-bar");

async function getWeather() {
  const searchValue = searchBar.value;

  const URL = `https://api.weatherapi.com/v1/current.json?key=7d3bc585323a47ed8b482529232204&q=${searchValue}`;

  const response = await fetch(URL, { mode: "cors" });

  const data = await response.json();
  console.log(data);
}

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    getWeather();
  }
});
