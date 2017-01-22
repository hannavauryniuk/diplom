var app = angular.module('myApp');

app.controller('checkWeatherController', function ($scope,  $http, uiGmapGoogleMapApi) {
    $scope.search = '';
    $scope.options = {
        types: '(cities)'
    };
    $scope.details = '';
    $scope.itemNumber =3;
    $scope.results =[];
    $scope.getWeather = function() {
        $http.get("http://api.openweathermap.org/data/2.5/weather?q="+$scope.search+"&APPID=170fb5209f8eb67ee44eb90ccc45b4eb").then(
            function (response) {
                $scope.resultResponse = {
                    name:$scope.search.split(',')[0],
                    code:response.data.sys.country,
                    temp: Math.round(response.data.main.temp - 273),
                    description:response.data.weather[0].description,
                    iconUrl:"http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
                };
                $scope.results.push($scope.resultResponse);
            }
        )
        if ($scope.results.length >= $scope.itemNumber) {
            $scope.results =[];
        }
    }
})