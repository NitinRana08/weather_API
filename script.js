const apiKey = "1ea0cee95a2a9ff0f7818bc777987f18";

const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.getElementById("city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");
const submit = document.getElementById("search-btn");

formEle.addEventListener("submit" , (event)=>{
    event.preventDefault();
    // console.log("hlo")
    // console.log(cityNameEle.value)
    const cityValue = cityNameEle.value
    console.log(cityValue)

    getWeatherData(cityValue)
} )




async function getWeatherData(cityValue){
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
    if(!response.ok){
        throw new Error("API network error!")
    }
    const data = await response.json()
    document.getElementById("heading").textContent = data.name;
    console.log(data);

    const temprature = Math.floor(data.main.temp)
    const description = data.weather[0].description 
    const icon = data.weather[0].icon


    const details = [
        `Feels like: ${Math.floor(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind Speed: ${data.wind.speed}m/s`

    ]

    weatherDataEle.querySelector(".temp").textContent=`${temprature}°C`
    weatherDataEle.querySelector(".desc").textContent=`${description}`
    imgIcon.innerHTML= `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" id="weather-icon">`

    weatherDataEle.querySelector(".details").innerHTML = details.map((detail)=>{
        return `<div>${detail}</div>`
    }).join("")





    }catch(err){

    }
}


