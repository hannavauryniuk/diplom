var app = angular.module('myApp');

app.service('httpWeatherRequestService', function ($http) {
    var results =[];
    this.getWeather = function(search) {
        $http.get("http://api.openweathermap.org/data/2.5/weather?q="+search+"&APPID=170fb5209f8eb67ee44eb90ccc45b4eb").then(
            function (response) {
                var resultResponse = {
                    name:search.split(',')[0],
                    code:response.data.sys.country,
                    temp: Math.round(response.data.main.temp - 273),
                    description:response.data.weather[0].description,
                    iconUrl:"http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
                };
                results.push(resultResponse);
            }
        )
    }
    this.results = results;
})