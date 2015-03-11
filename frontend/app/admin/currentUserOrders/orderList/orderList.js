'use strict';

angular.module('zamaszamaApp.orderList', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/orderList', {
        templateUrl: 'admin/currentUserOrders/orderList/orderList.html',
        controller: 'OrderListController'
      });
    }])

.controller('OrderListController', function ($scope, OrdersFactory, OrderFactory, $location) {
      $scope.editOrder = function (orderId) {
        $location.path('/orderDetail').search({orderId: orderId});
      };

      $scope.deleteOrder = function (orderId) {
        OrderFactory.delete({orderId: orderId}, function () {
          $scope.orders = OrdersFactory.query();
        });
      };

      $scope.createNewOrder = function () {
        $location.path('/orderCreation');
      };

      $scope.orders = OrdersFactory.query();
    });