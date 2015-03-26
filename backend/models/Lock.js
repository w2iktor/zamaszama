"use strict";

var mongoose = require('mongoose');

var LockSchema = new mongoose.Schema({
    lockDate: {
        type: String,
        select: false
    }
}, {_id: true});

mongoose.model('Lock', LockSchema);