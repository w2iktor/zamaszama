'use strict';

angular.module('zamaszamaApp.mealDetail', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/mealDetail', {
        templateUrl: 'admin/meals/mealDetail/mealDetail.html',
        controller: 'MealDetailController'
      });
    }])

.controller('MealDetailController', function ($scope, $routeParams, MealFactory, $location) {
      $scope.updateMeal = function () {
        MealFactory.update({mealId: $routeParams.mealId}, $scope.mealDetails, function () {
          $location.path('/mealList');
        });

      };

      $scope.cancel = function () {
        $location.path('/mealList');
      };

      $scope.mealDetails = MealFactory.show({mealId: $routeParams.mealId});
    });