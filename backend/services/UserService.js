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

exports.read = function(userLogin, callback) {
    User.findOne({login: userLogin }, function (err, data) {
        if(err) {
            return callback(err);
        }
        if(data === null){
            return callback('Invalid user login: ' + userLogin);
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
//TODO: check __v value - it should be updated
exports.update = function(userBody, callback) {
//	var user = new userModel(userBody);
    var login = userBody.login;
    User.findOne({login: login }, function (err, doc) {
        if(err) {
            return callback(err);
        }
        if(doc === null){
            return callback('Invalid user login: ' + login);
        }
        doc.name = userBody.name;
        doc.email = userBody.email;
        doc.increment();
        doc.save();
        callback(null, doc);
    });
};

exports.remove = function(userLogin, callback) {
    User.remove({login: userLogin}, function(err, user) {
        if(err) {
            return callback(err);
        }
        callback(null, user);
    });
};