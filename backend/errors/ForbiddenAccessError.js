"use strict";
function ForbiddenAccessError(code, error) {
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "ForbiddenAccessError";
    this.message = error.message;
    this.code = code;
    this.status = 403;
    this.inner = error;
}

ForbiddenAccessError.prototype = Object.create(Error.prototype);
ForbiddenAccessError.prototype.constructor = ForbiddenAccessError;

module.exports = ForbiddenAccessError;
