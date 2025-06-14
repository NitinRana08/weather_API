const apiKey = "1ea0cee95a2a9ff0f7818bc777987f18";

const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.getElementById("city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");
const submit = document.getElementById("search-btn");
const videoContainer = document.querySelector(".video-container");
const videoElement = videoContainer.querySelector("video");





formEle.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityNameEle.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("API network error!");
    }

    const data = await response.json();
    document.body.classList.remove("with-gradient")//back ground removing after api call
    console.log(data);

    document.getElementById("heading").textContent = data.name;

    const temprature = Math.floor(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const mainWeather = data.weather[0].main;
    const isDayTime = icon.includes("d");

    const details = [
      `Feels like: ${Math.floor(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed}m/s`,
    ];

    weatherDataEle.querySelector(".temp").textContent = `${temprature}°C`;
    weatherDataEle.querySelector(".desc").textContent = `${description}`;
    imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" id="weather-icon">`;

    weatherDataEle.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");

   
    setWeatherVideo(mainWeather, isDayTime);
  } 
  catch (err) {
    alert("City not found or network error!");
    console.error(err);
  }
}

function setWeatherVideo(condition, isDay) {
  let videoSrc = "";

  const weather = condition.toLowerCase();

  if (weather === "clear" && isDay) {
    videoSrc = "sun videoplayback.mp4";
  } 
  else if (weather === "rain") {
    videoSrc = "rain2.mp4";
  } 
  else if (weather === "snow") {
    videoSrc = "snow video.mp4";
  } 
  else if (weather === "clouds") {
    videoSrc = "cloud video.mp4";
  } 
  else if (["mist", "fog", "haze", "smoke", "dust"].includes(weather)) {
    videoSrc = "wind videoplayback.mp4"
  }     
  else {
    videoSrc = "";
  }


  if (videoSrc) {
    videoElement.src = videoSrc;
    videoContainer.style.display = "block";
  } else {
    videoContainer.style.display = "none";
  }
}
