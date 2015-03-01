'use strict';

angular.module('zamaszamaApp.userList', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/userList', {
        templateUrl: 'admin/users/userList/userList.html',
        controller: 'UserListController'
      });
    }])

.controller('UserListController', function ($scope, UsersFactory, UserFactory, $location) {
      $scope.editUser = function (login) {
        $location.path('/userDetail/' + login);
      };

      $scope.deleteUser = function (login) {
        UserFactory.delete({login: login}, function () {
          $scope.users = UsersFactory.query();
        });
      };

      $scope.createNewUser = function () {
        $location.path('/userCreation');
      };

      $scope.users = UsersFactory.query();
    });