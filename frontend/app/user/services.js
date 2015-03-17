'use strict';

zamaszamaApp.factory('ChangePasswordFactory', function ($resource) {
    return $resource('mocks/', {port: ':3000'}, {
        update: { method: 'PUT', isArray: false }
    })
});

zamaszamaApp.factory('UserCurrentOrderFactory', function ($resource) {
    return $resource('mocks/menu.json', {port: ':3000'}, {
        show: { method: 'GET', isArray: true },
        create: { method: 'POST', isArray: true },
        delete: { method: 'DELETE', isArray: true }
    })
});