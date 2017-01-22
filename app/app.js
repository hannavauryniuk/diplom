'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['uiGmapgoogle-maps'])
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyAKZIxKO0w-59mF5kxJi7tUyuBH7m9nWKA',
            v: '3', //defaults to latest 3.X anyhow
            libraries: 'places'
        });
    });