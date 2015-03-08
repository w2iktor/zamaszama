"use strict";

var log 			= require('./log')(module);
var config 			= require('./config');
var path = require('path'),
    util = require('util'),
    redis = require("redis"),
    client = redis.createClient(),
    _ = require("lodash"),
    jsonwebtoken = require("jsonwebtoken"),
    TOKEN_EXPIRATION = config.get('token:expirationInMinutes'),
    TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60,
    UnauthorizedAccessError = require('../errors/UnauthorizedAccessError.js');

client.on('error', function (err) {
	log.debug('Error: ',err.toString());
});

client.on('connect', function () {
	log.debug("Redis successfully connected");
});

module.exports.fetch = function (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');
        if (part.length === 2) {
            var token = part[1];
            return part[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports.create = function (user, req, res, next) {

	log.debug("Create token");

    if (_.isEmpty(user)) {
        return next(new Error('User data cannot be empty.'));
    }

    var data = {
        _id: user._id,
        login: user.login,
        access: user.access,
        name: user.name,
        email: user.email,
        role: user.role,
        token: jsonwebtoken.sign({ _id: user._id }, config.get('token:secret'), {
            expiresInMinutes: TOKEN_EXPIRATION
        })
    };

    var decoded = jsonwebtoken.decode(data.token);

    data.token_exp = decoded.exp;
    data.token_iat = decoded.iat;

    log.debug("Token generated for user: %s, token: %s", data.login, data.token);

    client.set(data.token, JSON.stringify(data), function (err, reply) {
        if (err) {
            return next(new Error(err));
        }

        if (reply) {
            client.expire(data.token, TOKEN_EXPIRATION_SEC, function (err, reply) {
                if (err) {
                    return next(new Error("Can not set the expire value for the token key"));
                }
                if (reply) {
                    req.user = data;
                    next(); // we have succeeded
                } else {
                    return next(new Error('Expiration not set on redis'));
                }
            });
        }
        else {
            return next(new Error('Token not set in redis'));
        }
    });

    return data;

};

module.exports.retrieve = function (id, done) {

	log.debug("Calling retrieve for token: %s", id);

    if (_.isNull(id)) {
        return done(new Error("token_invalid"), {
            "message": "Invalid token"
        });
    }

    client.get(id, function (err, reply) {
        if (err) {
            return done(err, {
                "message": err
            });
        }

        if (_.isNull(reply)) {
            return done(new Error("token_invalid"), {
                "message": "Token doesn't exists, are you sure it hasn't expired or been revoked?"
            });
        } else {
            var data = JSON.parse(reply);
            log.debug("User data fetched from redis store for user: %s", data.login);

            if (_.isEqual(data.token, id)) {
                return done(null, data);
            } else {
                return done(new Error("token_doesnt_exist"), {
                    "message": "Token doesn't exists, login into the system so it can generate new token."
                });
            }

        }

    });

};

module.exports.verify = function (req, res, next) {

	log.debug("Verifying token");

    var token = exports.fetch(req.headers);

    jsonwebtoken.verify(token, config.get('token:secret'), function (err, decode) {

        if (err) {
            req.user = undefined;
            return next(new UnauthorizedAccessError("invalid_token"));
        }

        exports.retrieve(token, function (err, data) {

            if (err) {
                req.user = undefined;
                return next(new UnauthorizedAccessError("invalid_token", data));
            }

            req.user = data;
            next();

        });

    });
};

module.exports.expire = function (headers) {

    var token = exports.fetch(headers);

    log.debug("Expiring token: %s", token);

    if (token !== null) {
        client.expire(token, 0);
    }

    return token !== null;

};

module.exports.middleware = function () {

    var func = function (req, res, next) {

        var token = exports.fetch(req.headers);

        exports.retrieve(token, function (err, data) {

            if (err) {
                req.user = undefined;
                return next(new UnauthorizedAccessError("invalid_token", data));
            } else {
                req.user = _.merge(req.user, data);
                next();
            }

        });
    };

    func.unless = require("express-unless");

    return func;

};

module.exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
module.exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC;

log.debug(" Utils Loaded");