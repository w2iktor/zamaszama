'use strict';

angular.module('zamaszamaApp.orderCreation', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orderCreation', {
    templateUrl: 'admin/currentUserOrders/createOrder/orderCreation.html',
    controller: 'OrderCreationController'
  });
}])

.controller('OrderCreationController', function ($scope, $routeParams, OrderFactory, $location) {
        $scope.createNewOrder = function () {
            OrderFactory.create($scope.order, function () {
                $location.path('/orderList');
            });
        };

      $scope.cancel = function () {
        $location.path('/orderList');
      };
        // TODO: need to load empty order here
        $scope.order = OrderFactory.show({id: $routeParams.id});
    });