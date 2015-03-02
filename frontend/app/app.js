'use strict';

// Declare app level module which depends on views, and components
var zamaszamaApp = angular.module('zamaszamaApp', [
  'ngRoute',
  'zamaszamaApp.view1',
  'zamaszamaApp.view2',
  'zamaszamaApp.userCreation',
  'zamaszamaApp.userDetail',
  'zamaszamaApp.userList',
  'zamaszamaApp.version',
  'zamaszamaApp.login'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
