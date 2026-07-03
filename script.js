const API_KEY = "d26cdf879a31ed533bd4239d923ba48b" ;
const searchInput = document.querySelector('input') ;
const searchBtn = document.querySelector('button') ;
const cityName = document.querySelector('#city-name') ;
const temperature = document.querySelector('#temperature') ;
const weather = document.querySelector('#weather') ;
const feelsLike = document.querySelector("#feels-like") +"°C";;
const humidity = document.querySelector('#humidity') + "%" ;
wind.textContent = (data.wind.speed * 3.6).toFixed(1) + " km/h";
const pressure = document.querySelector('#pressure') +  " hPa"; 
visibility.textContent = (data.visibility / 1000) + " km";
const sunrise = document.querySelector('#sunrise') ;
const sunset = document.querySelector('#sunset') ;
const uv = document.querySelector("#uv") ;
const clouds = document.querySelector("#clouds")
const weatherIcon = document.querySelector('#weather-icon')

searchBtn.addEventListener('click',function() {
    const city = searchInput.value ;
    if (city === "") {
    alert("Please enter a city name.");
    return;
}
    getWeather(city) ;
    
})
async function getWeather(city) {
    try { 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url) ;
     if(!response.ok) {
        throw new Error("City not found") ;
    }
    const data = await response.json() ; 
    console.log(data) ; 
    cityName.textContent = data.name ;
    temperature.textContent = data.main.temp + "°C";
    weather.textContent = data.weather[0].main ;
    feelsLike.textContent = data.main.feels_like ;
    humidity.textContent = data.main.humidity ;
    wind.textContent = data.wind.speed + " m/s" ;
    pressure.textContent = data.main.pressure ;
    const icon = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    visibility.textContent = data.visibility ;
   const sunriseTime = new Date(data.sys.sunrise * 1000);
const sunsetTime = new Date(data.sys.sunset * 1000); 
const sunriseFormatted = sunriseTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});

const sunsetFormatted = sunsetTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});
sunrise.textContent = sunriseFormatted;
sunset.textContent = sunsetFormatted;
    clouds.textContent = data.clouds.all + "%" ;
}
catch(error) {
    console.log(error) ;
    alert("City not found!");
}
}
