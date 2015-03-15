var mongoose = require('mongoose');
var Order=mongoose.model('Order');
var dateUtils = require('requirefrom')('libs')('date_utils');

function readAll(callback){
    Order.find(function (err, data) {
        if(err) {
            return callback(err);
        }
        callback(null, data);
    });
};

function read(userEmail, date, callback) {
    //console.log('Date: ' + date);
    var formattedDate = dateUtils.toDate(date);
    //console.log("Formatted date: " + formattedDate);
    Order.findOne({userLogin: userEmail, bareDate: formattedDate }, function (err, data) {
        if(err) {
            return callback(err);
        }
        if(data === null){
            return callback(new Error('No order'));
        }
        callback(null, data);
    });
};

function create(orderBody, callback) {
    var order = new Order(orderBody);
    console.log('Order date: ' + order.date);
    order.save(function(err, data) {
        if(err) {
            return callback(err);
        }
        callback(null, data);
    });
};

function update(email, date, properties, callback) {
    read(email,date, function (err, doc) {
        if(err) {
            return callback(err);
        }
        if(doc === null){
            return callback('There is no order for: ' + email + ' on: ' + date);
        }
        doc.set(properties);
        doc.save(function (err) {
            if (err) return callback(err);
            return callback(null, doc);
        });
    });
};

function remove(userEmail,date, callback) {
    var formattedDate = dateUtils.toDate(date);
    Order.remove({userLogin: userEmail, bareDate: formattedDate }, function(err, data) {
        if(err) {
            return callback(err);
        }
        callback(null, data);
    });
};


module.exports = {
    readAll: readAll,
    read: read,
    create: create,
    update: update,
    remove: remove
}