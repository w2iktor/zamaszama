"use strict";

var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
    email: {
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
    needChangePassword: {
        type: Boolean,
        default: false
    },
	role: {
		type: String,
		required: true,
		default: 'USER',
		enum: ['USER', 'ADMIN']
	}
}, {_id: true});

//Model transformation
if (!UserSchema.options.toJSON) UserSchema.options.toJSON = {};
UserSchema.options.toJSON.transform = function (doc, ret, options) {
    return { name: ret.name, email: ret.email, needChangePassword: ret.needChangePassword }
};

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