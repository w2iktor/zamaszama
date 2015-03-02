'use strict';

angular.module('zamaszamaApp.login', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'authorization/login.html',
            controller: 'LoginController'
        });
    }])

    .controller('LoginController', function ($scope, $routeParams, $location) {

    });