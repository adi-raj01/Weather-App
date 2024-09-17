const apikey = "2e0c5791d7a3325c665689fd5b701efd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apikey}`);
        if (!response.ok) { // Check if response is OK
            throw new Error('City not found');
        }
        const data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " Km/h";

        // Use the correct property for weather conditions
        const weatherCondition = data.weather[0].main;

        // Set the appropriate weather icon
        switch (weatherCondition) {
            case "Clouds":
                weatherIcon.src = "clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "clear.png";
                break;
            case "Rain":
                weatherIcon.src = "rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "mist.png";
                break;
            default:
                weatherIcon.src = "default.png"; // Fallback icon
                break;
        }

    } 
    catch (error) {
        console.error(error);
        alert("Invide city");
    }
    document.querySelector(".weather").style.display ="block";
}
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
