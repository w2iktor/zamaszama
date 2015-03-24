'use strict';

angular.module('zamaszamaApp.userCurrentOrder', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/userCurrentOrder', {
        templateUrl: 'user/currentOrder/currentOrder.html',
        controller: 'UserCurrentOrderController'
      });
    }])

.controller('UserCurrentOrderController', function ($scope, UserCurrentOrderFactory, MealsFactory, $location) {
      $scope.sendOrder = function () {
          var choosenMeals = {meals:[]};
              angular.forEach($scope.currentOrder.meals, function(meal, key) {
                  if (meal.amount > 0) {
                      var newMeal = {}
                      newMeal.amount = meal.amount;
                      newMeal.meal = meal.name;
                      newMeal._id = meal._id
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
        var savedCurrentOrder = UserCurrentOrderFactory.show(function(response){
            if($scope.currentOrder.message == "No order"){
                $scope.currentOrder = {meals:[]}
            }
            else {
                //TODO : Verify if code below works when current order crud will be fixed
                $scope.currentOrder = {meals:[]}
                angular.forEach(savedCurrentOrder.meals, function(meal, key) {
                    if (meal.amount > 0) {
                        var newMeal = {}
                        newMeal.amount = meal.amount;
                        newMeal.meal = meal.name;
                        newMeal._id = meal._id
                        $scope.currentOrder.meals.push(newMeal);
                    }
                });
            }
        });
        $scope.menu = MealsFactory.query();
    });