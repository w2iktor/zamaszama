var requirefrom     = require('requirefrom');
var log 			= requirefrom('libs')('log')(module);

module.exports.errorMiddleware = function (err, req, res, next) {
    var errorType = typeof err,
        code = 500,
        msg = {message: "Internal Server Error"};

    switch (err.name) {
        case "UnauthorizedError":
            code = err.status;
            msg = undefined;
            break;
        case "BadRequestError":
        case "UnauthorizedAccessError":
        case "ForbiddenAccessError":
        case "NotFoundError":
            code = err.status;
            msg = err.inner;
            break;
        default:
            break;
    }
    log.error(err);

    return res.status(code).json(msg);
};


module.exports.optionsMiddleware = function (req, res, next){
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        log.debug('Send 200 to OPTIONS request')
        res.send(200);
    }
    else {
        log.debug('Processing request: ' + req.method);
        next();
    }
};

module.exports.headerMiddleware = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
};