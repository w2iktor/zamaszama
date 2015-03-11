var express = require('express');
var router = express.Router();
var services = require('requirefrom')('services');
var service = services('UserService');

/* GET users listing. */
exports.list =  function(req, res, next) {
    console.log('Receive request for all users');
    service.readAll(function(err, data) {
        sendRespond(res, err, data);
    });
};
exports.read =  function(req, res, next) {
    var userLogin = req.params.login;
    console.log('Receive request for user: ' + userLogin);
    service.read(userLogin, function(err, data) {
        sendRespond(res, err, data);
    });
};

exports.create =  function(req, res, next) {
    console.log('Receive request for create user: ');
    console.dir(req.body);
    service.create(req.body, function(err, user) {
        sendRespond(res, err, user);
    });
};

exports.update=  function(req, res, next) {
    console.log('Receive request for update user: ');
    console.dir(req.body);
    service.update(req.body, function(err, user) {
        sendRespond(res, err, user);
    });
};

exports.delete =  function(req, res, next) {
    var userLogin = req.params.login;
    service.remove(userLogin, function(err, user) {
        sendRespond(res, err, "user: " + req.params.login + " deleted successfully");
    });
};


function sendRespond(res, err, data){
    if(err){
        res.status(err.status || 500);
        res.json({
            message: err
        });
    } else {
        res.json(data);
    }
}

