'use strict';

angular.module('zamaszamaApp.userCurrentOrder', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/userCurrentOrder', {
        templateUrl: 'user/currentOrder/currentOrder.html',
        controller: 'UserCurrentOrderController'
      });
    }])

.controller('UserCurrentOrderController', function ($scope, UserCurrentOrderFactory, $location) {
      $scope.sendOrder = function () {

          var choosenMeals = [];
          angular.forEach($scope.order.meals, function(value, key) {
              if(value.amount > 0){
                  choosenMeals.push(value);
              }
              console.log(choosenMeals);
          });
          $scope.order.meals = choosenMeals;

          UserCurrentOrderFactory.create($scope.order, function () {
          });
      };

      $scope.removeOrder = function () {
          UserCurrentOrderFactory.delete($scope.order, function () {
          });
      };

        $scope.order = UserCurrentOrderFactory.show();
    });