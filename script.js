const APIKey = "876559b85c408829a93b29a565931343";


function getApi(city) {
   var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    axios.get(requestUrl)
        .then(function (response) {
            console.log(response)
        })
}

$('.searchBtn').on('click', getApi);