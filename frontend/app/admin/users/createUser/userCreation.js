'use strict';

angular.module('zamaszamaApp.userCreation', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userCreation', {
    templateUrl: 'admin/users/createUser/userCreation.html',
    controller: 'UserCreationController'
  });
}])

.controller('UserCreationController', function ($scope, $routeParams, UsersFactory, $location) {
        $scope.createNewUser = function () {
            UsersFactory.create($scope.newUser, function () {
                $location.path('/userList');
            });
        };

      $scope.cancel = function () {
        $location.path('/userList');
      };

    });