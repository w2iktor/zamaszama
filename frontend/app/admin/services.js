'use strict';

zamaszamaApp.factory('UsersFactory', function ($resource) {
    return $resource('http://localhost:port/api/admin/users', {port: ':3000'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

zamaszamaApp.factory('UserFactory', function ($resource) {
    return $resource('http://localhost:port/api/admin/users/:email', {port: ':3000', email:'@email'}, {
        show: { method: 'GET', isArray: false },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
    })
});


zamaszamaApp.factory('OrdersFactory', function ($resource) {
    return $resource('mocks/orders.json', {port: ':3000'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

zamaszamaApp.factory('OrderFactory', function ($resource) {
    return $resource('mocks/order.json', {port: ':3000'}, {
        show: { method: 'GET', isArray: false },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
    })
});