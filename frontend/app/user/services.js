'use strict';

zamaszamaApp.factory('ChangePasswordFactory', function ($resource) {
    return $resource('mocks/', {port: ':3000'}, {
        update: { method: 'PUT', isArray: false }
    })
});

zamaszamaApp.factory('UserCurrentOrderFactory', function ($resource) {
    return $resource('http://localhost:port/api/currentOrder', {port: ':3000'}, {
        show: { method: 'GET', isArray: false },
        create: { method: 'POST', isArray: false },
        delete: { method: 'DELETE', isArray: false },
        update: { method: 'PUT', isArray: false }
    })
});

zamaszamaApp.factory('UserMealsFactory', function ($resource) {
    return $resource('http://localhost:port/api/meals', {port: ':3000'}, {
        query: { method: 'GET', isArray: true }
    })
});