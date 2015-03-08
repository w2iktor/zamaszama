"use strict";

var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
}, {_id: true});

mongoose.model('Comment', CommentSchema);