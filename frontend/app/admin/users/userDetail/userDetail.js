'use strict';

angular.module('zamaszamaApp.userDetail', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/userDetail', {
        templateUrl: 'admin/users/userDetail/userDetail.html',
        controller: 'UserDetailController'
      });
    }])

.controller('UserDetailController', function ($scope, $routeParams, UserFactory, $location) {
      $scope.updateUser = function () {
        UserFactory.update($scope.user, function () {
          $location.path('/userList');
        });

      };

      $scope.cancel = function () {
        $location.path('/userList');
      };

      $scope.user = UserFactory.show({login: $routeParams.login});
    });