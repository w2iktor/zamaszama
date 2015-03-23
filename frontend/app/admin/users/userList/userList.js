'use strict';

angular.module('zamaszamaApp.userList', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/userList', {
        templateUrl: 'admin/users/userList/userList.html',
        controller: 'UserListController'
      });
    }])

.controller('UserListController', function ($scope, UsersFactory, UserFactory, $location) {
      $scope.editUser = function (email) {
        $location.path('/userDetail').search({email: email});
      };

      $scope.deleteUser = function (email) {
        UserFactory.delete({email: email}, function () {
          $scope.users = UsersFactory.query();
        });
      };

      $scope.createNewUser = function () {
        $location.path('/userCreation');
      };

      $scope.users = UsersFactory.query();
    });