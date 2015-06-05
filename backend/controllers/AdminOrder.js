var requireFrom = require('requirefrom');
var respond = requireFrom('libs')('send_respond');
var services = requireFrom('services');
var service = services('OrderService');
var lockService = services('LockService');

exports.getByDate =  function(req, res, next) {
    var date = req.swagger.params.date.value;
    console.log('Receive request for all orders on: ' + date);
    service.readGivenDate(date, function(err, data) {
        respond.sendRespond(res, err, data);
    });
};

exports.create =  function(req, res, next) {
    console.log('Receive request for create order: ');
    var order = req.swagger.params.order.value;
    order.userLogin = req.user.email;
    console.dir(order);
    service.create(order, function(err, user) {
        respond.sendRespond(res, err, user);
    });
};

exports.update=  function(req, res, next) {
    var order = req.swagger.params.order.value;
    delete order.userLogin;
    delete order.date;
    var today = new Date();
    service.update(req.user.email, today, order, function(err, user) {
        respond.sendRespond(res, err, user);
    });
};

exports.delete =  function(req, res, next) {
    var email = req.user.email;
    var today = new Date();
    service.remove(email, today, function(err, user) {
        respond.sendRespond(res, err, "Current order for: " + email + " deleted successfully");
    });
};

exports.getAggregatedSummary =  function(req, res, next) {
    var date = req.swagger.params.date.value;
    service.getAggregatedSummary(
        date,
        function(err, data) {
            respond.sendRespond(res, err, data);
    });
};

exports.lockOrder = function(req, res, next){
    lockService.create(new Date(), function(err, lock){
        respond.sendRespond(res, err, lock);
    });
};

exports.unlockOrder = function(req, res, next){
    lockService.remove(new Date(), function(err, lock){
        respond.sendRespond(res, err, lock);
    });
};

exports.getLockOrder = function(req, res, next){
    lockService.read(new Date(), function(err, lock){
        respond.sendRespond(res, err, lock);
    });
};