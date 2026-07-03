const API_KEY = "d26cdf879a31ed533bd4239d923ba48b" ;
const searchInput = document.querySelector('input') ;
const searchBtn = document.querySelector('button') ;
const cityName = document.querySelector('#city-name') ;
const temperature = document.querySelector('#temperature') ;
const weather = document.querySelector('#weather') ;
const feelsLike = document.querySelector("#feels-like")
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind') ;
const pressure = document.querySelector('#pressure');
const visibility = document.querySelector("#visibility") ;
const sunrise = document.querySelector('#sunrise') ;
const sunset = document.querySelector('#sunset') ;
const uv = document.querySelector("#uv") ;
const clouds = document.querySelector("#clouds")
const weatherIcon = document.querySelectorAll('.weather-icon')
const currentWeatherIcon = document.querySelector("#current-weather-icon");

  function searchCity() {
        const city = searchInput.value.trim() ;
        if(city==="") {
            alert('Please enter a city name:') ;
            return ;
        }
        getWeather(city) ;
  }
    searchBtn.addEventListener("click", searchCity) ;
    searchInput.addEventListener("keydown" , function(event) {
        if(event.key === 'Enter') {
            searchCity() ;
        }
    })
async function getWeather(city) {
    try { 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    
    const response2 = await fetch(forecastUrl) ;
    const forecastData = await response2.json() ;
    console.log(forecastData) ;


    const response = await fetch(url) ;
     if(!response.ok) {
        throw new Error("City not found") ;
    }
    const data = await response.json() ; 
    console.log(data) ; 
    cityName.textContent = data.name ;
    temperature.textContent = data.main.temp + "°C";
    weather.textContent = data.weather[0].main ;
    feelsLike.textContent = data.main.feels_like +"°C";
    humidity.textContent = data.main.humidity + "%" ;
    const icon = data.weather[0].icon;
    console.log(icon) ;
    console.log(`https://openweathermap.org/img/wn/${icon}@2x.png`);
    currentWeatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    wind.textContent = (data.wind.speed * 3.6).toFixed(1) + " km/h";
    pressure.textContent = data.main.pressure  +  " hPa" ;
    weatherIcon.forEach(iconImg => {
    iconImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
});
    visibility.textContent = (data.visibility / 1000) + " km";
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

getWeather("Delhi"); 
