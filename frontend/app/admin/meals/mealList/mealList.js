'use strict';

angular.module('zamaszamaApp.mealList', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/mealList', {
        templateUrl: 'admin/meals/mealList/mealList.html',
        controller: 'MealListController'
      });
    }])

.controller('MealListController', function ($scope, MealsFactory, MealFactory, $location) {
      $scope.editMeal = function (mealId) {
        $location.path('/mealDetail').search({mealId: mealId});
      };

      $scope.deleteMeal = function (mealId) {
        MealFactory.delete({mealId: mealId}, function () {
          $scope.meals = MealsFactory.query();
        });
      };

      $scope.createNewMeal = function () {
        $location.path('/mealCreation');
      };

      $scope.meals = MealsFactory.query();
    });