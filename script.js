// setting all variables below
var apiKey = "a5829138f11c991aee3b9736b5ea743b";

// var userInput = document.querySelector("#search-input");
var citySearchBtn = document.querySelector("#search-button");
// var hidePageIntro = document.querySelector("#weather-hide-intro");
// var hideDrinkIntro = document.querySelector("#ingredient-text");
// var cardSection = document.querySelector("#card-section");
var weatherCard = document.querySelector("#current-weather-container");
var weatherCardtitle = document.querySelector("#current-title");
var weatherIcon = document.querySelector("#current-weather-icon");
var displayTemp = document.querySelector("#current-temperature");
// var displayIcon = document.querySelector("#tempicon");
var displayHumidity = document.querySelector("#current-humidity");
var displayWind = document.querySelector("#current-wind-speed");
var displayUVIndex = document.querySelector("#current-uv-index");

//make weather card style display none until its called

weatherCard.style.display = "none";

//display when the search button is clicked

citySearchBtn.addEventListener("click", function (event) {
var userInput = $("#search-input").val();
event.preventDefault();
weatherCard.style.display = "flex";
weatherAPI(userInput); //call the weatherAPI function here to populatethe weather container
});

var weatherAPI = function (userInput) {
// get and use data from open weather current weather api end point
fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}`
)
// get response and turn it into objects
.then(function (response) {
return response.json();
})
.then(function (response) {
// get city's longitude and latitude

//setting current city title here (how to set date?)
var currentTitle = document.getElementById("current-title");
currentTitle.textContent = userInput;

var cityLon = response.coord.lon;
var cityLat = response.coord.lat;
console.log(response);
console.log(cityLon);
console.log(cityLat);
displayCurrentTemp();

fetch(
`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`
)
// get response from one call api and turn it into objects
.then(function (response) {
return response.json();
})
// get data from response and apply them to the future 5 day forecast here
.then(function (response) {
var cityLon = response.city.coord.lon;
var cityLat = response.city.coord.lat;

for (var i = 1; i <= 5; i++) {
var futureIcon = $("#future-icon-" + i);
var futureIconCode = response.list[i].weather[0].icon;
console.log(response);
var iconUrl =`https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`;
console.log(iconUrl);

var futureTemp = $("future-date-" + i);
futureTemp.textContent = "Temp: " + response.list[i].main.temp;
console.log(futureTemp);

// var futureHumidity = $("#future-humidity-" + i);
// futureHumidity.text(
// "Humidity: " + response.daily[i].humidity + "%"
// );
// var futureWindSpeed = $("#future-wind-speed-" + i);
// futureWindSpeed.text(
// "Wind Speed: " + response.daily[i].wind_speed + " MPH"
// );
}
// }
function renderForecastCard() {

    
 
    
    // Add content to elements
    cardTitle.textContent = dayjs(forecast.dt_txt).format("M/D/YYYY");
    weatherIcon.setAttribute("src", iconUrl);
    weatherIcon.setAttribute("alt", iconDescription);
    tempEl.textContent = `Temp: ${tempF} °F`;
    windEl.textContent = `Wind: ${windMph} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    
    forecastContainer.append(col);
    }
    
    // Function to display 5 day forecast.
    function renderForecast(dailyForecast) {
    // Create unix timestamps for start and end of 5 day forecast
    var startDt = dayjs().add(1, "day").startOf("day").unix();
    var endDt = dayjs().add(6, "day").startOf("day").unix();
    
    var headingCol = document.createElement("div");
    var heading = document.createElement("h4");
    
    headingCol.setAttribute("class", "col-12");
    heading.textContent = "5-Day Forecast:";
    headingCol.append(heading);
    
    forecastContainer.innerHTML = "";
    forecastContainer.append(headingCol);
    
    for (var i = 0; i < dailyForecast.length; i++) {
    // First filters through all of the data and returns only data that falls between one day after the current data and up to 5 days later.
    if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
    // Then filters through the data and returns only data captured at noon for each day.
    if (dailyForecast[i].dt_txt.slice(11, 13) == "12") {
    renderForecastCard(dailyForecast[i]);
    }
    }
    }
    }
}






);
function displayCurrentTemp() {
displayTemp.textContent = "Temperature: " + response.main.temp + "°F";
// add current temperature to page
var iconUrl = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;
console.log("icon", iconUrl);
weatherIcon.setAttribute("src", iconUrl);
// add current humidity to page
displayHumidity.textContent =
"Humidity: " + response.main.humidity + "%";

// add current wind speed to page
displayWind.textContent = "Wind Speed: " + response.wind.speed + " MPH";
}
});
};

//------------------
// Function to display a forecast card given an object from open weather api
// daily forecast.


function renderItems(city, data) {
// renderCurrentWeather(city, data.list[0], data.city.timezone);
renderForecast(data.list);
}

// Fetches weather data for given location from the Weather Geolocation
// endpoint; then, calls functions to display current and forecast weather data.
// function fetchWeather(location) {
// var { lat } = location;
// var { lon } = location;
// var city = location.name;

// var apiUrl = `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;

// fetch(apiUrl)
// .then(function (res) {
// return res.json();
// })
// .then(function (data) {
// renderItems(city, data);
// })
// .catch(function (err) {
// console.error(err);
// });
// }

// function fetchCoords(search) {
// var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

// fetch(apiUrl)
// .then(function (res) {
// return res.json();
// })
// .then(function (data) {
// if (!data[0]) {
// alert("Location not found");
// } else {
// appendToHistory(search);
// fetchWeather(data[0]);
// }
// })
// .catch(function (err) {
// console.error(err);
// });
// }