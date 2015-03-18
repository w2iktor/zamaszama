'use strict';

angular.module('zamaszamaApp.login', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'authorization/login.html',
            controller: 'LoginController'
        });
    }])

    .controller('LoginController', function ($scope, $routeParams, $location, $rootScope, $http, $window) {
        $rootScope.user = {login: 'test', password: 'test'};
        $rootScope.isAuthenticated = false;
        $rootScope.welcome = '';

        $scope.submit = function () {
            $http
                .post('http://localhost:3000/api/login', $rootScope.user)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    $rootScope.isAuthenticated = true;
                    $rootScope.welcome = 'You are logged as ' + data.name;
                    $rootScope.message = 'Welcome ' + data.name;
                    $rootScope.error = '';
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete sessionStorage.token;
                    $rootScope.isAuthenticated = false;

                    // Handle login errors here
                    $rootScope.error = 'Error: Invalid user or password';
                    $rootScope.welcome = '';
                    $rootScope.message = ''
                });
        };

        $rootScope.logout = function () {
            $http
                .get('http://localhost:3000/api/logout', $rootScope.user)
                .success(function () {
                    $rootScope.message = 'You have been succesfully logged out.';
                    $rootScope.welcome = '';
                    $rootScope.isAuthenticated = false;
                    delete $window.sessionStorage.token;
                    $location.path('/login');
                })
                .error(function () {
                });
        };
    });