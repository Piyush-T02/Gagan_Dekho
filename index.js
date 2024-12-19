const inputBox = document.querySelector('.input-box');
const SearchBtn = document.getElementById('searchbtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('windspeed');
const location_not_found = document.querySelector('.location-not-found'); // Fixed selector
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    try {
        const api_key = "27250a74f5aaf8235a6999cf1a1e2560";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }
        
        const weather_data = await response.json();
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${(weather_data.wind.speed * 3.6).toFixed(1)} Kph`;
        
        switch (weather_data.weather[0].main) {
            case "Clouds":
                weather_img.src = "./Climate Photos/cloud.png";
                break;
            case "Clear":
                weather_img.src = "./Climate Photos/clear.png";
                break;
            case "Mist":
                weather_img.src = "./Climate Photos/mist.png";
                break;
            case "Snow":
                weather_img.src = "./Climate Photos/snow.png";
                break;
            case "Rain":
                weather_img.src = "./Climate Photos/rain.png";
                break;
            default:
                weather_img.src = "./Climate Photos/404.png";
            break;
        }
        console.log(weather_data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

SearchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (!city) {
        alert("Please enter a location.");
        return;
    }
    checkWeather(city);
});

inputBox.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        const city = inputBox.value.trim();
        if (!city) {
            alert("Please enter a location.");
            return;
        }
        checkWeather(city);
    }
});