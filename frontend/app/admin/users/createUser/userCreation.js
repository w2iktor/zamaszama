'use strict';

angular.module('zamaszamaApp.userCreation', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userCreation', {
    templateUrl: 'admin/users/createUser/userCreation.html',
    controller: 'UserCreationController'
  });
}])

.controller('UserCreationController', function ($scope, $routeParams, UserFactory, $location) {
        $scope.createNewUser = function () {
            UserFactory.create($scope.user, function () {
                $location.path('/userList');
            });
        };

      $scope.cancel = function () {
        $location.path('/userList');
      };

    });