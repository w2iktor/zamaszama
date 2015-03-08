"use strict";

var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
	login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		default: 'USER',
		enum: ['USER', 'ADMIN']
	}
}, {_id: true});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema, 'users');