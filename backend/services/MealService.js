var mongoose = require('mongoose');
var Meal=mongoose.model('Meal');

exports.readAll = function (callback){
    Meal.find(function (err, data) {
        if(err) {
            return callback(err);
        }
        callback(null, data);
    });
};

exports.read = function(_id, callback) {
    Meal.findOne({_id: _id }, function (err, data) {
        if(err) {
            return callback(err);
        }
        if(data === null){
            return callback('Invalid meal id: ' + _id);
        }
        callback(null, data);
    });
};

exports.create = function(mealBody, callback) {
    var meal = new Meal(mealBody);
    meal.save(function(err, data) {
        if(err) {
            return callback(err);
        }
        callback(null, data);
    });
};

exports.update = function(id, properties, callback) {
    Meal.findByIdAndUpdate(id, { $set: properties}, function (err, meal) {
        if(err) {
            return callback(err);
        }
        callback(null, meal);
    });
};

exports.remove = function(_id, callback) {
    Meal.remove({_id: _id}, function(err, meal) {
        if(err) {
            return callback(err);
        }
        callback(null, meal);
    });
};