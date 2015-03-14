var mongoose = require('mongoose');
var User=mongoose.model('User');

exports.readAll = function (callback){
    User.find(function (err, data) {
        if(err) {
            return callback(err);
        }
        callback(null, data);
    });
};

exports.read = function(email, callback) {
    User.findOne({email: email }, function (err, data) {
        if(err) {
            return callback(err);
        }
        if(data === null){
            return callback('Invalid user login: ' + email);
        }
        callback(null, data);
    });
};

exports.create = function(userBody, callback) {
    var user = new User(userBody);
    user.save(function(err, data) {
        if(err) {
            return callback(err);
        }
        callback(null, data);
    });
};

exports.update = function(email, properties, callback) {
    User.findOne({email: email }, function (err, doc) {
        if(err) {
            return callback(err);
        }
        if(doc === null){
            return callback('Invalid user login: ' + email);
        }
        doc.set(properties);
        //doc.name = properties.name;
        //doc.password = properties.password;
        doc.save(function (err) {
            if (err) return callback(err);
            return callback(null, doc);
        });
    });
};

exports.remove = function(email, callback) {
    User.remove({email: email}, function(err, user) {
        if(err) {
            return callback(err);
        }
        callback(null, user);
    });
};