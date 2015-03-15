var services = require('requirefrom')('services');
var service = services('OrderService');

exports.read =  function(req, res, next) {
    var email = req.user.email;
    var today = new Date();
    console.log('Receive request for user: ' + email + ' on: ' + today);
    service.read(email, today, function(err, data) {
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


function sendRespond(res, err, data){
    if(err){
        throw new Error(err);
    } else {
        res.json(data);
    }
}

