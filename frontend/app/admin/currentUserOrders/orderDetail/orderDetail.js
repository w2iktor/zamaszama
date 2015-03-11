'use strict';

angular.module('zamaszamaApp.orderDetail', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/orderDetail', {
        templateUrl: 'admin/currentUserOrders/orderDetail/orderDetail.html',
        controller: 'OrderDetailController'
      });
    }])

.controller('OrderDetailController', function ($scope, $routeParams, OrderFactory, $location) {
      $scope.updateOrder = function () {
        OrderFactory.update($scope.order, function () {
          $location.path('/orderList');
        });

      };

      $scope.cancel = function () {
        $location.path('/orderList');
      };

      $scope.order = OrderFactory.show({id: $routeParams.id});
    });