'use strict';

angular.module('zamaszamaApp.userCurrentOrder', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/userCurrentOrder', {
        templateUrl: 'user/currentOrder/currentOrder.html',
        controller: 'UserCurrentOrderController'
      });
    }])

.controller('UserCurrentOrderController', function ($scope, UserCurrentOrderFactory, MealsFactory, $filter, $location) {
      $scope.sendOrder = function () {
          var choosenMeals = {meals:[]};
              angular.forEach($scope.currentOrder.meals, function(meal, key) {
                  if (meal.amount > 0) {
                      var newMeal = {}
                      newMeal.amount = meal.amount;
                      newMeal.meal = meal._id;
                      //newMeal.price = meal.price;
                      //newMeal.type = meal.type;
                      //newMeal.name = meal.name;
                      //newMeal.company = meal.company;
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

        $scope.menu = MealsFactory.query(function(){
            var savedCurrentOrder = UserCurrentOrderFactory.show(function(response){
                if(savedCurrentOrder.message == "No order"){
                    $scope.currentOrder = {meals:[]}
                }
                else {
                    //TODO : Verify if code below works when current order crud will be fixed
                    $scope.currentOrder = {meals:[]}
                    angular.forEach(savedCurrentOrder.meals, function(meal, key) {
                        if (meal.amount > 0) {
                            var newMeal = {}


                            var fullMealInfo = $filter('filter')($scope.menu, {_id: meal._id})[0];


                            newMeal.amount = meal.amount;
                            newMeal._id = meal.meal;

                            newMeal.price = fullMealInfo.price;
                            newMeal.type = fullMealInfo.type;
                            newMeal.name = fullMealInfo.name;
                            newMeal.company = fullMealInfo.company;
                            $scope.currentOrder.meals.push(newMeal);
                        }
                    });
                }
            });
        });

    });