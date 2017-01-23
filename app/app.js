'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'uiGmapgoogle-maps',
    'ngRoute'
]);
app.config(['$locationProvider', '$routeProvider', 'uiGmapGoogleMapApiProvider', function($locationProvider, $routeProvider, uiGmapGoogleMapApiProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when ('/', {
            templateUrl : 'views/home.html'
            }        )
        .when('/main', {
            templateUrl : 'views/main.html',
            controller: 'checkWeatherController'
        })
        .otherwise({redirectTo: '/errorPage.html'});
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBvLJIeT1Nxm2lGjae5NPqQrmNgMseQuJE',
        v: '3',
        libraries: 'places'
    });
}]);