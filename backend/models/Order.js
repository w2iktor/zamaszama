"use strict";

var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    meals: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Meal'
    }],
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
}, {_id: true});

mongoose.model('Order', OrderSchema);