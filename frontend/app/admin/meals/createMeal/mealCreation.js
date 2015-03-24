'use strict';

angular.module('zamaszamaApp.mealCreation', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mealCreation', {
    templateUrl: 'admin/meals/createMeal/mealCreation.html',
    controller: 'MealCreationController'
  });
}])

.controller('MealCreationController', function ($scope, $routeParams, MealsFactory, $location) {
        $scope.createNewMeal = function () {
            MealsFactory.create($scope.newMeal, function () {
                $location.path('/mealList');
            });
        };

      $scope.cancel = function () {
        $location.path('/mealList');
      };

    });