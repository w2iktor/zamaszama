"use strict";

var dateUtils = require('requirefrom')('libs')('date_utils');
var mongoose = require('mongoose');

//function toDate (val) {
//    if (!val) return val;
//    return val.getFullYear() + "/" + (val.getMonth() + 1) + "/" + val.getDate();
//}

var OrderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    meals: [{
        meal: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Meal'
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    userLogin: {
        required: true,
        type: String
    },
    bareDate: {
        type: String,
        select: false
    }
}, {_id: true});

//var virtual = OrderSchema.virtual('bareDate');
//virtual.get(function () {now
//    return dateUtils.toDate(this.date);
//});
// timezone offset :  - this.date.getTimezoneOffset() * 60000

OrderSchema.pre('save', function (next) {
    if (this.isModified('date') || this.isNew) {
        var date = new Date(this.date.getTime());
        this.bareDate = dateUtils.toDate(date);
        //console.log('Base date: ' + date);
        next();
    } else {
        return next();
    }
});

//OrderSchema.set('toJSON', { getters: true, virtuals: true });

mongoose.model('Order', OrderSchema);