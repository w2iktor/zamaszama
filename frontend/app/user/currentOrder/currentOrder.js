'use strict';

angular.module('zamaszamaApp.userCurrentOrder', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/userCurrentOrder', {
        templateUrl: 'user/currentOrder/currentOrder.html',
        controller: 'UserCurrentOrderController'
      });
    }])

.controller('UserCurrentOrderController', function ($scope, UserCurrentOrderFactory, UserMenuFactory, $location) {
      $scope.sendOrder = function () {
          var choosenMeals = {meals:[]};
              angular.forEach($scope.currentOrder.meals, function(meal, key) {
                  if (meal.amount > 0) {
                      var newMeal = {}
                      newMeal.amount = meal.amount;
                      newMeal.meal = meal.name;
                      choosenMeals.meals.push(newMeal);
                  }
              });

          var jsonMeals = angular.toJson(choosenMeals, true);
          console.log(jsonMeals);

          UserCurrentOrderFactory.create(jsonMeals, function () {
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
        $scope.currentOrder = UserCurrentOrderFactory.show(function(response){
            if($scope.currentOrder.message == "No order"){
                $scope.currentOrder = {meals:[]}
            }
        });
        $scope.menu = UserMenuFactory.show();
    });