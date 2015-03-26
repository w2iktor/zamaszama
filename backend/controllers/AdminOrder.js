var services = require('requirefrom')('services');
var service = services('OrderService');
var lockService = services('LockService');

exports.getByDate =  function(req, res, next) {
    var date = req.swagger.params.date.value;
    console.log('Receive request for all orders on: ' + date);
    service.readGivenDate(date, function(err, data) {
        sendRespond(res, err, data);
    });
};

exports.create =  function(req, res, next) {
    console.log('Receive request for create order: ');
    var order = req.swagger.params.order.value;
    order.userLogin = req.user.email;
    console.dir(order);
    service.create(order, function(err, user) {
        sendRespond(res, err, user);
    });
};

exports.update=  function(req, res, next) {
    var order = req.swagger.params.order.value;
    delete order.userLogin;
    delete order.date;
    var today = new Date();
    service.update(req.user.email, today, order, function(err, user) {
        sendRespond(res, err, user);
    });
};

exports.delete =  function(req, res, next) {
    var email = req.user.email;
    var today = new Date();
    service.remove(email, today, function(err, user) {
        sendRespond(res, err, "Current order for: " + email + " deleted successfully");
    });
};

exports.lockOrder = function(req, res, next){
    lockService.create(new Date(), function(err, lock){
       sendRespond(res, err, lock);
    });
};

exports.unlockOrder = function(req, res, next){
    lockService.remove(new Date(), function(err, lock){
        sendRespond(res, err, lock);
    });
};

function sendRespond(res, err, data){
    if(err){
        throw new Error(err);
    } else {
        res.set("Content-type", "application/json; charset=utf-8")
            .send(JSON.stringify(data, null, 2));
        //res.json(data);
    }
}

