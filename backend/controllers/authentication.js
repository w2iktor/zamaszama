"use strict";

var log 		        	= require('../libs/log')(module);
var _                       = require("lodash");
var util                    = require('util');
var path                    = require('path');
var bcrypt                  = require('bcryptjs');
var utils                   = require("../libs/utils.js");
var Router                  = require("express").Router;
var UnauthorizedAccessError = require(path.join(__dirname, "..", "errors", "UnauthorizedAccessError.js"));
var jwt                     = require("express-jwt");
var mongoose                = require('mongoose');

var User=mongoose.model('User');

function login(req, res, next) {

    log.debug("Processing authenticate middleware");

    var login = req.body.login,
        password = req.body.password;

    if (_.isEmpty(login) || _.isEmpty(password)) {
        return next(new UnauthorizedAccessError("401", {
            message: 'Invalid login or password'
        }));
    }

    process.nextTick(function () {

        User.findOne({
            login: login
        }, function (err, user) {

            if (err || !user) {
                return next(new UnauthorizedAccessError("401", {
                    message: 'Invalid login or password'
                }));
            }

            user.comparePassword(password, function (err, isMatch) {
                if (isMatch && !err) {
                    log.debug("User authenticated, generating token");
                    utils.create(user, req, res, function(){
                        return res.status(200).json(req.user);
                    });
                } else {
                    return next(new UnauthorizedAccessError("401", {
                        message: 'Invalid login or password'
                    }));
                }
            });
        });

    });


};

function verify(req, res, next) {
    return res.status(200).json(undefined);
}

function logout(req, res, next) {
    if (utils.expire(req.headers)) {
        delete req.user;
        return res.status(200).json({
            "message": "User has been successfully logged out"
        });
    } else {
        return next(new UnauthorizedAccessError("401"));
    }
}

module.exports = {
    login: login,
    logout: logout,
    verify: verify
}

log.debug("Loaded");
