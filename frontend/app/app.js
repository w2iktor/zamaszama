'use strict';

// Declare app level module which depends on views, and components
var zamaszamaApp = angular.module('zamaszamaApp', [
  'ngRoute',
  'zamaszamaApp.userCreation',
  'zamaszamaApp.userDetail',
  'zamaszamaApp.userList',
  'zamaszamaApp.version',
  'zamaszamaApp.login',
    'zamaszamaApp.passwordChange',
    'zamaszamaApp.userCurrentOrder'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
