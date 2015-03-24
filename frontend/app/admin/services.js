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




zamaszamaApp.factory('MealsFactory', function ($resource) {
    return $resource('http://localhost:port/api/admin/meals', {port: ':3000'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

zamaszamaApp.factory('MealFactory', function ($resource) {
    return $resource('http://localhost:port/api/admin/meals/:mealId', {port: ':3000', mealId:'@mealId'}, {
        show: { method: 'GET', isArray: false },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
    })
});