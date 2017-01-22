'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'uiGmapgoogle-maps',
    'ngRoute'
]);
app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when ('/', {
            templateUrl : 'views/home.html'
            }        )
        .when('/main', {
            templateUrl : 'views/main.html',
            controller: 'checkWeatherController'
        })
        .otherwise({redirectTo: '/errorPage.html'})
}]);