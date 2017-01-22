var app = angular.module('myApp');

app.controller('checkWeatherController', function ($scope,  $http, directionsRenderer, directionsService) {
    $scope.initializeDirections = function() {
        if ($scope.directionsDisplay) {
            // fallback to clear the previous directions
            $scope.directionsDisplay.setMap(null);
            $scope.directionsDisplay = null;
        }
        $scope.directionsDisplay = new directionsRenderer.get({
            preserveViewport: true,
            suppressMarkers: true
        });
    };
    $scope.initializeDirections();
    $scope.directionsService = directionsService.get();
    $scope.map = {
        center: { latitude: 0, longitude: 0 },
        zoom: 2,
        markers: [],
        events: {
            tilesloaded: function(map){
                $scope.directionsDisplay.setMap(map);
            }
        }
    };
    $scope.search = '';
    $scope.options = {
        types: '(cities)'
    };
    $scope.details = '';
    $scope.itemNumber = 3;
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
        );
    };
    $scope.addMarker = function () {
        $scope.cleanUp();
        $scope.getWeather();
        var marker = {
            id: Date.now(),
            coords: {
                latitude: $scope.details.geometry.location.lat(),
                longitude: $scope.details.geometry.location.lng()
            }
        };
        $scope.map.zoom = 7;
        $scope.map.center = {
            latitude: $scope.details.geometry.location.lat(),
            longitude: $scope.details.geometry.location.lng()
        };
        $scope.map.markers.push(marker);
        $scope.displayDrivingDirections();
    };
    $scope.displayDrivingDirections = function() {
        var markers = $scope.map.markers;
        if (markers.length > 1) {
            var directionsServiceRequest = {
                origin: $scope.getLocation(markers[0].coords.latitude, markers[0].coords.longitude),
                destination: $scope.getLocation(markers[markers.length-1].coords.latitude,
                    markers[markers.length-1].coords.longitude),
                waypoints: [],
                optimizeWaypoints: false,
                provideRouteAlternatives: false,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC
            };
            if (markers.length > 2) {
                for(var i = 1; i <= markers.length-1; i++){
                    directionsServiceRequest.waypoints.push({
                        location: $scope.getLocation(markers[i].coords.latitude, markers[i].coords.longitude),
                        stopover: true
                    });
                }
            }
            $scope.directionsService.route(directionsServiceRequest, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {

                    $scope.directionsDisplay.setDirections(response);
                }
            });
        }
    };
    $scope.getLocation = function(latitude, longitude) {
        return latitude + "," + longitude;
    };
    $scope.cleanUp = function() {
        if ($scope.map.markers.length >= $scope.itemNumber) {
            $scope.map.markers =[];
            $scope.initializeDirections();
        }

        if ($scope.results.length >= $scope.itemNumber) {
            $scope.results =[];
        }
    };
});