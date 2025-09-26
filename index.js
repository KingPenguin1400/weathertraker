//WEATHER APP JS

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "59a3eb8697593f10d47b4065ce7f31e7";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city name.");
    }

});

async function getWeatherData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    console.log(response);

    if (!response.ok) {
        throw new Error("Could not fetch weather data.");
    }

    return await response.json();
}

async function displayWeatherInfo(data) {


    console.log(data);

    const {name: city,
            main: {temp, humidity},
            weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDiv = document.createElement("div");
    const humidityDisplay = document.createElement("p");
    const humidityInfo = document.createElement("div");
    //const br0 = document.createElement("br");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) +32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityInfo.innerHTML = `<button class="humidityB">?</button>` + `<p class="humidityP">Humidity is a measure of water vapor in the air.</p>`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = await getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDiv.classList.add("humidityDiv");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    humidityInfo.classList.add("humidityInfo");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDiv);
    humidityDiv.appendChild(humidityDisplay);
    humidityDiv.appendChild(humidityInfo);
    //card.appendChild(humidityDisplay);
    //card.appendChild(humidityInfo);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

async function getWeatherEmoji(weatherId) {

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"; // Atmosphere
        case (weatherId === 800):
            return "☀️"; // Clear
        case (weatherId > 800 && weatherId < 900):
            return "☁️"; // Clouds
        default:
            return "❓🛸🌈"; // Unknown
    }

}

async function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}