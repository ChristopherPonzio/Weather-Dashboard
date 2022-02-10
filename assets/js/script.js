var city = document.getElementById("city");
var cityNameEl = document.getElementById("cityName");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvIndexEl = document.getElementById("uvIndex");
var forecast = document.getElementById("forecast");
var historyEl = document.getElementById("searchHistory");
var currentWeather = document.getElementById("currentWeather");
var picEl = document.getElementById("pic");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var searchInput = document.querySelector("#userInput");
var dayCard = document.querySelectorAll("dayCard");
var day1 = document.getElementById("day1");
var day2 = document.getElementById("day2");
var day3 = document.getElementById("day3");
var day4 = document.getElementById("day4");
var day5 = document.getElementById("day5");
var historyEl = document.getElementById("history");
var historyBtn = document.getElementById("historyBtn")
var search ;
var cityNameValue ;


const apiKey = "492c98d0f802f64c5e1159bbedae749e";

function handleSubmit(event) {
    event.preventDefault();
    search = searchInput.value.trim();
    searchInput.value = "";
    searchHistory.push(search);
    localStorage.setItem("search", JSON.stringify(searchHistory));
     getApi(search);
     renderHistory(search);
     localStorage.remove(search);
}

//fetch lat and lon
function getApi(search) {
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            cityNameValue = data[0]["name"];
            console.log(data);
            getLatLon(data[0]);
        })
        .catch( error => console.log(error) )
		.finally( console.log('finished with fetch') )
}

//save search in local storage
function renderHistory(search) {
    console.log(searchHistory);
    for (var i = 0; i < searchHistory.length; i++) {
    const historyItem = document.createElement("button");
    historyItem.setAttribute("type", "button");
    historyItem.setAttribute("class", "historyBtn btn btn-primary mb-3");
    historyItem.innerHTML = searchHistory[i];
    historyEl.append(historyItem);
    }  
}


// fetch weather using lat lon
function getLatLon(location) {
    var { lat, lon } = location;
    var city = location.name;
    var latLonUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${apiKey}`;
    
    fetch(latLonUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //currentWeather
            const currentDate = new Date(data["current"]["dt"] * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            var date = month + "/" + day + "/" + year;
            cityNameEl.innerHTML = cityNameValue + date;
            
            var tempValue = data["current"]["temp"];
            tempEl.innerHTML = "Temperature: " + tempValue + " &#176F";
            
            var windValue = data["current"]["wind_speed"];
            windEl.innerHTML = "Wind Speed: " + windValue + " MPH";
            
            var humidityValue = data["current"]["humidity"];
            humidityEl.innerHTML = "Humidity: " + humidityValue + " %";
            
            var uvIndexValue = data["current"]["uvi"];
            uvIndexEl.innerHTML = "UV Index: " + uvIndexValue;
            console.log(data);
            
            var weatherPic = data["current"]["weather"][0].icon;
            picEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            picEl.setAttribute("alt", data["current"]["weather"][0].description);

            //Forcast
            var forcast5day = document.getElementById("5Day");
            forcast5day.innerHTML = "5-Day Forcast";
            var forcastDate = new Date(data["daily"][1]["dt"] * 1000);
            var forcastDay = forcastDate.getDate();
            var forcastMonth = forcastDate.getMonth() + 1;
            var forcastYear = forcastDate.getFullYear();
            var combinedForcastDate = forcastMonth + "/" + forcastDay + "/" + forcastYear;
            var dayCardDate = document.createElement("h3");
            dayCardDate.setAttribute("class", "dayCardDate mt-3 mb-0");
            dayCardDate.innerHTML = combinedForcastDate;
            day1.append(dayCardDate);

            var dayimg = data["daily"][1]["weather"][0].icon;
            var dayimgEl = document.createElement("img")
            dayimgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dayimg + "@2x.png");
            dayimgEl.setAttribute("alt", data["daily"][0]["weather"][0].description);
            day1.append(dayimgEl);

            var daytemp = data["daily"][1]["temp"]["day"];
            var daytempEl = document.createElement("p");
            daytempEl.innerHTML = "Temp: " + daytemp + " &#176F";
            day1.append(daytempEl);

            var daywind = data["daily"][1]["wind_speed"];
            var daywindEl = document.createElement("p");
            daywindEl.innerHTML = "Wind: " + daywind + " MPH";
            day1.append(daywindEl);

            var dayhumidity = data["daily"][1]["humidity"];
            var dayhumidityEl = document.createElement("p");
            dayhumidityEl.innerHTML = "Humidity: " + dayhumidity + " %";
            day1.append(dayhumidityEl);
           
            //day2
            var forcastDate = new Date(data["daily"][2]["dt"] * 1000);
            var forcastDay = forcastDate.getDate();
            var forcastMonth = forcastDate.getMonth() + 1;
            var forcastYear = forcastDate.getFullYear();
            var combinedForcastDate = forcastMonth + "/" + forcastDay + "/" + forcastYear;
            var dayCardDate = document.createElement("h3");
            dayCardDate.setAttribute("class", "dayCardDate mt-3 mb-0");
            dayCardDate.innerHTML = combinedForcastDate;
            day2.append(dayCardDate);

            var dayimg = data["daily"][2]["weather"][0].icon;
            var dayimgEl = document.createElement("img")
            dayimgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dayimg + "@2x.png");
            dayimgEl.setAttribute("alt", data["daily"][2]["weather"][0].description);
            day2.append(dayimgEl);

            var daytemp = data["daily"][2]["temp"]["day"];
            var daytempEl = document.createElement("p");
            daytempEl.innerHTML = "Temp: " + daytemp + " &#176F";
            day2.append(daytempEl);

            var daywind = data["daily"][2]["wind_speed"];
            var daywindEl = document.createElement("p");
            daywindEl.innerHTML = "Wind: " + daywind + " MPH";
            day2.append(daywindEl);

            var dayhumidity = data["daily"][2]["humidity"];
            var dayhumidityEl = document.createElement("p");
            dayhumidityEl.innerHTML = "Humidity: " + dayhumidity + " %";
            day2.append(dayhumidityEl);

            //day3
            var forcastDate = new Date(data["daily"][3]["dt"] * 1000);
            var forcastDay = forcastDate.getDate();
            var forcastMonth = forcastDate.getMonth() + 1;
            var forcastYear = forcastDate.getFullYear();
            var combinedForcastDate = forcastMonth + "/" + forcastDay + "/" + forcastYear;
            var dayCardDate = document.createElement("h3");
            dayCardDate.setAttribute("class", "dayCardDate mt-3 mb-0");
            dayCardDate.innerHTML = combinedForcastDate;
            day3.append(dayCardDate);

            var dayimg = data["daily"][3]["weather"][0].icon;
            var dayimgEl = document.createElement("img")
            dayimgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dayimg + "@2x.png");
            dayimgEl.setAttribute("alt", data["daily"][3]["weather"][0].description);
            day3.append(dayimgEl);

            var daytemp = data["daily"][3]["temp"]["day"];
            var daytempEl = document.createElement("p");
            daytempEl.innerHTML = "Temp: " + daytemp + " &#176F";
            day3.append(daytempEl);

            var daywind = data["daily"][3]["wind_speed"];
            var daywindEl = document.createElement("p");
            daywindEl.innerHTML = "Wind: " + daywind + " MPH";
            day3.append(daywindEl);

            var dayhumidity = data["daily"][3]["humidity"];
            var dayhumidityEl = document.createElement("p");
            dayhumidityEl.innerHTML = "Humidity: " + dayhumidity + " %";
            day3.append(dayhumidityEl);    
           
            //day 4
            var forcastDate = new Date(data["daily"][4]["dt"] * 1000);
            var forcastDay = forcastDate.getDate();
            var forcastMonth = forcastDate.getMonth() + 1;
            var forcastYear = forcastDate.getFullYear();
            var combinedForcastDate = forcastMonth + "/" + forcastDay + "/" + forcastYear;
            var dayCardDate = document.createElement("h3");
            dayCardDate.setAttribute("class", "dayCardDate mt-3 mb-0");
            dayCardDate.innerHTML = combinedForcastDate;
            day4.append(dayCardDate);

            var dayimg = data["daily"][4]["weather"][0].icon;
            var dayimgEl = document.createElement("img")
            dayimgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dayimg + "@2x.png");
            dayimgEl.setAttribute("alt", data["daily"][4]["weather"][0].description);
            day4.append(dayimgEl);

            var daytemp = data["daily"][4]["temp"]["day"];
            var daytempEl = document.createElement("p");
            daytempEl.innerHTML = "Temp: " + daytemp + " &#176F";
            day4.append(daytempEl);

            var daywind = data["daily"][4]["wind_speed"];
            var daywindEl = document.createElement("p");
            daywindEl.innerHTML = "Wind: " + daywind + " MPH";
            day4.append(daywindEl);

            var dayhumidity = data["daily"][4]["humidity"];
            var dayhumidityEl = document.createElement("p");
            dayhumidityEl.innerHTML = "Humidity: " + dayhumidity + " %";
            day4.append(dayhumidityEl); 

            //Day 5
            var forcastDate = new Date(data["daily"][5]["dt"] * 1000);
            var forcastDay = forcastDate.getDate();
            var forcastMonth = forcastDate.getMonth() + 1;
            var forcastYear = forcastDate.getFullYear();
            var combinedForcastDate = forcastMonth + "/" + forcastDay + "/" + forcastYear;
            var dayCardDate = document.createElement("h3");
            dayCardDate.setAttribute("class", "dayCardDate mt-3 mb-0");
            dayCardDate.innerHTML = combinedForcastDate;
            day5.append(dayCardDate);

            var dayimg = data["daily"][5]["weather"][0].icon;
            var dayimgEl = document.createElement("img")
            dayimgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dayimg + "@2x.png");
            dayimgEl.setAttribute("alt", data["daily"][5]["weather"][0].description);
            day5.append(dayimgEl);

            var daytemp = data["daily"][5]["temp"]["day"];
            var daytempEl = document.createElement("p");
            daytempEl.innerHTML = "Temp: " + daytemp + " &#176F";
            day5.append(daytempEl);

            var daywind = data["daily"][5]["wind_speed"];
            var daywindEl = document.createElement("p");
            daywindEl.innerHTML = "Wind: " + daywind + " MPH";
            day5.append(daywindEl);

            var dayhumidity = data["daily"][5]["humidity"];
            var dayhumidityEl = document.createElement("p");
            dayhumidityEl.innerHTML = "Humidity: " + dayhumidity + " %";
            day5.append(dayhumidityEl); 
        });
    }
    function removeElements() {
        var daywindEl = document.querySelectorAll("daywindEl");
        var dayhumidityEl = document.querySelectorAll("dayhumidityEl");
        var daytempEl = document.querySelectorAll("daytempEl");
        var dayimgEl = document.querySelectorAll("dayimgEl");
        var dayCardDate = document.querySelectorAll("dayCardDate");
        daywindEl.remove(daywindEl);
        dayhumidityEl.remove();
        daytempEl.remove();
        dayimgEl.remove();
        dayCardDate.remove();

    }


$('.searchBtn').on('click', handleSubmit);
