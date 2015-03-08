var _ = require("lodash");
var UnauthorizedAccessError = require('../errors/UnauthorizedAccessError.js');
var ForbiddenAccessError = require('../errors/ForbiddenAccessError.js');

module.exports.middleware = function () {

    var func = function (req, res, next) {

        var user = req.user;
        if(_.isNull(user)){
            return next(new UnauthorizedAccessError("missing_user", {
                "message": "You are not authorized!"
            }));
        }
        if (! _.isEqual(user.role, 'ADMIN')){
            return next(new ForbiddenAccessError("to_low_permission", {
                "message": "You are not allow to use this resources!"
            }));
        }
        next();
    };

    return func;

};