var requireFrom = require('requirefrom');
var respond = requireFrom('libs')('send_respond');
var services = requireFrom('services');
var service = services('OrderService');
var lockService = services('LockService');

exports.read =  function(req, res, next) {
    var email = req.user.email;
    var today = new Date();
    console.log('Receive request for user: ' + email + ' on: ' + today);
    service.read(email, today, function(err, data) {
        respond.sendRespond(res, err, data);
    });
};

exports.create =  function(req, res, next) {
    console.log('Receive request for create order: ');

    var order = req.swagger.params.order.value;
    order.userLogin = req.user.email;
    console.dir(order);
    lockService.read(new Date(), function(err, lockCounter){
        if(lockCounter == 0){
            service.create(order, function(err, user) {
                respond.sendRespond(res, err, user);
            });
        } else {
            return respond.sendRespond(res,err, {message: "Ordering is currently lock"});
        }
    });
};

exports.update=  function(req, res, next) {
    var order = req.swagger.params.order.value;
    delete order.userLogin;
    delete order.date;
    var today = new Date();
    lockService.read(new Date(), function(err, lockCounter){
        if(lockCounter == 0){
            service.update(req.user.email, today, order, function(err, user) {
                respond.sendRespond(res, err, user);
            });
        } else {
            return respond.sendRespond(res,err, {message: "Ordering is currently lock"});
        }
    });
};

exports.delete =  function(req, res, next) {
    var email = req.user.email;
    var today = new Date();
    lockService.read(new Date(), function(err, lockCounter){
        if(lockCounter == 0){
            service.remove(email, today, function(err, deletedOrder) {
                respond.sendRespond(res, err, deletedOrder);
            });
        } else {
            return respond.sendRespond(res,err, {message: "Ordering is currently lock"});
        }
    });
};