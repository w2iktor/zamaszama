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

function readGivenDate(date, callback) {
    //console.log('Date: ' + date);
    var formattedDate = dateUtils.toDate(date);
    console.log("Formatted date: " + formattedDate);
    Order.find({bareDate: formattedDate }, function (err, data) {
        if(err) {
            return callback(err);
        }
        if(data === null){
            return callback({message: 'No order'});
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
            return callback(null,{message: 'No order'});
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
            return callback({message: 'There is no order for: ' + email + ' on: ' + date});
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

function getAggregatedSummary(date, callback) {
    var formattedDate = dateUtils.toDate(date);

    Order.mapReduce({map: summaryMap, reduce: summaryReduce, query: {bareDate: formattedDate}}, function(err, res){
        if(err) {
            return callback(err);
        }
        callback(null, res);
    });
};

function summaryMap(){
    for(var idx = 0 ; idx < this.meals.length; idx++){
        var key = this.meals[idx].meal;
        var value = this.meals[idx].amount;
        emit(key, value);
    }
};

function summaryReduce(mealId, amount) {
    return Array.sum(amount);
};

module.exports = {
    readAll: readAll,
    readGivenDate: readGivenDate,
    read: read,
    create: create,
    update: update,
    remove: remove,
    getAggregatedSummary: getAggregatedSummary
}