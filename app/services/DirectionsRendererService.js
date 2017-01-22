var app = angular.module('myApp');

app.service('directionsRenderer', function() {
    this.get = function (options) {
        return new google.maps.DirectionsRenderer(options);
    };
});
