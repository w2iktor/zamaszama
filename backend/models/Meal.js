"use strict";

var mongoose = require('mongoose');

var MealSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {_id: true});

mongoose.model('Meal', MealSchema);