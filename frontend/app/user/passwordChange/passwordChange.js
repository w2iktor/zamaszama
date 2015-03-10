'use strict';

angular.module('zamaszamaApp.passwordChange', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/passwordChange', {
    templateUrl: 'user/passwordChange/passwordChange.html',
    controller: 'PasswordChangeController'
  });
}])

.controller('PasswordChangeController', function ($scope, $routeParams, $location, ChangePasswordFactory) {
        $scope.updatePassword = function () {
            ChangePasswordFactory.update($scope.password, function () {

            });
        };

    });