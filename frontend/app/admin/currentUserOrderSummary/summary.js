'use strict';

angular.module('zamaszamaApp.orderSummary', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/orderSummary', {
            templateUrl: 'admin/currentUserOrderSummary/summary.html',
            controller: 'OrderSummaryController'
        });
    }])

    .controller('OrderSummaryController', function ($scope, OrderSummaryFactory, $location, $filter) {
        var currentDate = $filter('date')(new Date(), 'yyyy-MM-dd');
        $scope.orderSummary = OrderSummaryFactory.show({orderDate: currentDate});
    });