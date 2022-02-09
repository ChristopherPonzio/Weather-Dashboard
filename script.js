var userInput = document.getElementById("userInput").value;
var cityNameEl = document.getElementById("cityName");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvIndex = document.getElementById("uvIndex");
var forecast = document.getElementById("forecast");
var history = document.getElementById("history");
var city = document.getElementById("city");
var picEl = document.getElementById("pic");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var searchInput = document.querySelector("#userInput");
var search ;


const apiKey = "876559b85c408829a93b29a565931343";

function handleSubmit(event) {
    event.preventDefault();
    search = searchInput.value.trim();
    searchInput.value = "";
    getApi(search);
}
// returns the requested
function renderItems(city, data) {
    renderCurrentWeather(city, data.current, data.timezone);
    renderForecast(data.daily, data.timezone);
}

// fetching lat and lon for city search
function getLatLon(location) {
    var { lat, lon } = location;
    var city = location.name;
    var latLonUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${apiKey}`;

    fetch(latLonUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //renderItems(city, data);
            console.log(data);
        })
}

// fetching current weather based on user input


function getApi(search) {
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            //appendToHistory(search);
            getLatLon(data[0]);
        })
}

// fetching the weather image





//function savesearchHistory(searchHistory) {
    //var value = $(this).siblings("#city").value;

    //localStorage.setItem(cityName, value);
//}

$('.searchBtn').on('click', handleSubmit);