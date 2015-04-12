var requireFrom = require('requirefrom');
var respond = requireFrom('libs')('send_respond');
var services = requireFrom('services');
var service = services('UserService');

/* GET users listing. */
exports.list =  function(req, res, next) {
    console.log('Receive request for all users');
    service.readAll(function(err, data) {
        respond.sendRespond(res, err, data);
    });
};
exports.read =  function(req, res, next) {
    var email = req.swagger.params.email.value;
    console.log('Receive request for user: ' + email);
    service.read(email, function(err, data) {
        respond.sendRespond(res, err, data);
    });
};

exports.create =  function(req, res, next) {
    console.log('Receive request for create user: ');
    console.dir(req.body);
    service.create(req.body, function(err, user) {
        respond.sendRespond(res, err, user);
    });
};

exports.update=  function(req, res, next) {
    var email = req.swagger.params.email.value;
    var updatedUserProperties = req.swagger.params.user.value;
    delete updatedUserProperties.email;
    console.dir(updatedUserProperties);
    service.update(email, updatedUserProperties, function(err, user) {
        respond.sendRespond(res, err, user);
    });
};

exports.delete =  function(req, res, next) {
    var email = req.swagger.params.email.value;
    service.remove(email, function(err, user) {
        respond.sendRespond(res, err, "user: " + email + " deleted successfully");
    });
};