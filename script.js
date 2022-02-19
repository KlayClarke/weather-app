const fetchButton = document.querySelector("input[type='button']");
const cityNameDisplay = document.querySelector("#city-name");
const weatherGif = document.querySelector("img");

const currentTemp = document.querySelector("#current-temp");
const minMaxTemps = document.querySelector("#temp-min-max");
const humidity = document.querySelector("#humidity");
const feelsLike = document.querySelector("#feels-like");
const windChill = document.querySelector("#wind-chill");

console.log(currentTemp);

function displayCityName(city) {
  cityNameDisplay.innerText = city;
}

function displayCityWeatherInfo(data) {
  let temp = data.main.temp;
  let humidity = data.main.humidity;
  let feelsLikeTemp = data.main.feels_like;
  let minTemp = data.main.temp_min;
  let maxTemp = data.main.temp_max;
  let windSpeed = `${data.wind.speed}mph winds`;

  currentTemp.innerText = `${temp}°`;
  temp.innerText = `${currentTemp}°`;
  minMaxTemps.innerText = `Low: ${minTemp}°, High: ${maxTemp}°`;
  humidity.innerText = `${humidity}% relative humidity`;
  feelsLike.innerText = `Feels like ${feelsLikeTemp}°`;
  windChill.innerText = windSpeed;

  console.log({
    temp,
    humidity,
    feelsLikeTemp,
    minTemp,
    maxTemp,
    windSpeed,
  });
}

function displayError(msg) {
  cityNameDisplay.innerText = msg;
}

async function displayWeatherGif(weather) {
  try {
    let response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=KAEH8Nhd18a775RhjCjbuh1We6qSLMkV&s=${weather}`,
      {
        mode: "cors",
      }
    );

    let data = await response.json();
    weatherGif.src = data.data.images.original.url;
  } catch (err) {
    weatherGif.src = "https://media.giphy.com/media/sdVmH2UBMtn8Y/giphy.gif";
  }
}

async function fetchWeather() {
  try {
    let city = document.querySelector("input[name='city']").value;
    let response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a5562bcf068078abc0381db8dfc12bd6&units=imperial`
    );
    let data = await response.json();
    // if the api returns a 404 code
    if (data.cod === "404") {
      displayError(data.message);
    } else {
      displayCityName(
        `${data.name}, ${data.sys.country}: ${data.weather[0].main}`
      ); // change header name
      displayWeatherGif(data.weather[0].main);
      displayCityWeatherInfo(data);
    }
  } catch (err) {
    displayError(`Please try again. Error: ${err}`);
  }
}

fetchButton.addEventListener("click", fetchWeather);

// if fetch completes, go to giphy api and get a gif that represents weather
// state the weather, wind, high / low
//
