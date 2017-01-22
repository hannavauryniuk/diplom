var app = angular.module('myApp');

app.service('directionsService', function() {
    this.get = function () {
        return new google.maps.DirectionsService;
    };
});
