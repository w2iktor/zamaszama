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

          var choosenMeals = {meals:[]};
          angular.forEach($scope.menu, function(menu, key) {
              angular.forEach(menu.chosen, function(meal, key) {
                  if (meal.amount > 0) {
                      choosenMeals.meals.push(meal);
                  }
              });
          });
          console.log(angular.toJson(choosenMeals, true));

          UserCurrentOrderFactory.create(choosenMeals, function () {
          });
      };

      $scope.removeOrder = function () {
          UserCurrentOrderFactory.delete($scope.order, function () {
          });
      };

        $scope.addItem = function (selectedMenuItem, list) {
            list.push(selectedMenuItem);
        };

        $scope.deleteItem = function (selectedMenuItem, list) {
            list.splice( selectedMenuItem, 1 );
        };
        $scope.menu = UserCurrentOrderFactory.show();
    });