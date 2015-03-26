var mongoose = require('mongoose');
var Lock=mongoose.model('Lock');
var dateUtils = require('requirefrom')('libs')('date_utils');

exports.read = function(date, callback) {
    //console.log('Date: ' + date);
    var formattedDate = dateUtils.toDate(date);
    console.log("Formatted date: " + formattedDate);
    Lock.count({lockDate: formattedDate }, function (err, data) {
        if(err) {
            return callback(err);
        }
        callback(null, data);
    });
};

exports.create = function(date, callback) {
    var lock = new Lock();
    debugger;
    lock.lockDate = dateUtils.toDate(date);
    lock.save(function(err, data) {
        if(err) {
            return callback(err);
        }
        callback(null, data);
    });
};

exports.remove = function(date, callback) {
    var formattedDate = dateUtils.toDate(date);
    Lock.remove({lockDate: formattedDate }, function(err, data) {
        if(err) {
            return callback(err);
        }
        callback(null, data);
    });
};
