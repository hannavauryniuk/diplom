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
        key: 'AIzaSyAKZIxKO0w-59mF5kxJi7tUyuBH7m9nWKA',
        v: '3',
        libraries: 'places'
    });
}]);