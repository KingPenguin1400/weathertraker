//WEATHER APP JS

const weatherForm = document.querySelector(".weatherForm");
const tempInputForm = document.querySelector(".tempInputForm");
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
            main: {temp, humidity, feels_like},
            weather: [{description, id}]},
            wind: {speed} = data};

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDiv = document.createElement("div");
    const tempDisplay = document.createElement("p");
    const feellikeDiv = document.createElement("div");
    const feellikeDisplay = document.createElement("p");
    const feellikeInfo = document.createElement("div");
    const humidityDiv = document.createElement("div");
    const humidityDisplay = document.createElement("p");
    const humidityInfo = document.createElement("div");
    const windDisplay = document.createElement("p");
    //const br0 = document.createElement("br");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    cityDisplay.textContent = city;
    updatetemp();
    if(await updatetemp() === "kelvins"){
        tempDisplay.textContent = `${(temp).toFixed(1)}K`;
        feellikeDisplay.textContent = `Feels Like: ${(feels_like).toFixed(1)}K`;
    }else if(await updatetemp() === "farenhite"){
        tempDisplay.textContent = `${((temp - 273.15) * (9/5) +32).toFixed(1)}°F`;
        feellikeDisplay.textContent = `Feels Like: ${((feels_like - 273.15) * (9/5) +32).toFixed(1)}°F`;
    }else if(await updatetemp() === "celcius"){
        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        feellikeDisplay.textContent = `Feels Like: ${(feels_like - 273.15).toFixed(1)}°C`;
    }
    //tempDisplay.textContent = `${((temp - 273.15) * (9/5) +32).toFixed(1)}°F`;
    //feellikeDisplay.textContent = `Feels Like: ${((feels_like - 273.15) * (9/5) +32).toFixed(1)}°F`;
    feellikeInfo.innerHTML = `<button class="feellikeB">?</button>` + `<p class="feellikeP">"Feels like" temperature accounts for factors beyond air temperature, like wind and humidity, that affect how hot or cold it actually feels to the human body</p>`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityInfo.innerHTML = `<button class="humidityB">?</button>` + `<p class="humidityP">Humidity is a measure of water vapor in the air.</p>`;
    windDisplay = `${speed}mph`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = await getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDiv.classList.add("tempDiv");
    tempDisplay.classList.add("tempDisplay");
    feellikeDiv.classList.add("feellikeDiv");
    feellikeDisplay.classList.add("feellikeDisplay");
    feellikeInfo.classList.add("feellikeInfo");
    humidityDiv.classList.add("humidityDiv");
    humidityDisplay.classList.add("humidityDisplay");
    windDisplay.classList.add("windDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    humidityInfo.classList.add("humidityInfo");

    card.appendChild(cityDisplay);
    card.appendChild(tempDiv);
    tempDiv.appendChild(tempDisplay);
    tempDiv.appendChild(feellikeDiv);
    //tempDiv.appendChild(feellikeDisplay);
    //tempDiv.appendChild(feellikeInfo);
    feellikeDiv.appendChild(feellikeDisplay);
    feellikeDiv.appendChild(feellikeInfo);
    //card.appendChild(feellikeInfo);
    //card.appendChild(tempDisplay);
    //card.appendChild(feellikeDisplay);
    card.appendChild(humidityDiv);
    humidityDiv.appendChild(humidityDisplay);
    humidityDiv.appendChild(humidityInfo);
    //card.appendChild(br0);
    //card.appendChild(humidityDisplay);
    //card.appendChild(humidityInfo);
    card.appendChild(windDisplay);
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



const updatetemp = async function(){

    //if(tempDiv === null) return;
    //if(tempDisplay === null) return;
    //if(feellikeDiv === null) return;
    //if(feellikeDisplay === null) return;
    
    const temperatureInput0 = document.getElementById("temperatureInput0");
    const temperatureInput1 = document.getElementById("temperatureInput1");
    const temperatureInput2 = document.getElementById("temperatureInput2");
    const submitTempInput = document.querySelector(".submitTempInput");

    if(temperatureInput0.checked){
        console.log("Kelvins");
        //tempDisplay.textContent = `${(temp).toFixed(1)}K`;
        //feellikeDisplay.textContent = `Feels Like: ${(feels_like).toFixed(1)}K`;
        return "kelvins";
    }else if(temperatureInput1.checked){
        console.log("Farenhite");
        //tempDisplay.textContent = `${((temp - 273.15) * (9/5) +32).toFixed(1)}°F`;
        //feellikeDisplay.textContent = `Feels Like: ${((feels_like - 273.15) * (9/5) +32).toFixed(1)}°F`;
        return "farenhite";
    }else if(temperatureInput2.checked){
        console.log("Celcius");
        //tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        //feellikeDisplay.textContent = `Feels Like: ${(feels_like - 273.15).toFixed(1)}°C`;
        return "celcius";
    }
}

tempInputForm.addEventListener("submit", async event => {
    event.preventDefault();
    updatetemp();
    let city = cityInput.value;
    displayWeatherInfo(await getWeatherData(city));
    console.log("Submitted");
})

function opensurvey(){
    window.open("survey.html", "_blank");

}
