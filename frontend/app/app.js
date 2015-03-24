'use strict';

// Declare app level module which depends on views, and components
var zamaszamaApp = angular.module('zamaszamaApp', [
    'ngRoute',
    'angular.filter',
    'zamaszamaApp.userCreation',
    'zamaszamaApp.userDetail',
    'zamaszamaApp.userList',

    'zamaszamaApp.mealCreation',
    'zamaszamaApp.mealDetail',
    'zamaszamaApp.mealList',

    'zamaszamaApp.orderCreation',
    'zamaszamaApp.orderDetail',
    'zamaszamaApp.orderList',

    'zamaszamaApp.version',
    'zamaszamaApp.login',
    'zamaszamaApp.passwordChange',
    'zamaszamaApp.userCurrentOrder'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }]);

//Authentication interceptor
zamaszamaApp.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                // handle the case where the user is not authenticated
                $location.url('/login');
                $rootScope.welcome = '';
                $rootScope.isAuthenticated = false;
                delete $window.sessionStorage.token;
            }
            return $q.reject(rejection);
        }
    };
});

zamaszamaApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});