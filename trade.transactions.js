const mongoose = require('mongoose');
const moment = require('moment');

const schema = new mongoose.Schema({
    trade_no: String,
    /** 事务状态 PAYMENT, REFUND, DEPOSIT*/
    trade_type: String,
    /** 事务状态 init pending applied done*/
    status: { type: String, default: 'init' },
    created: Number,
    updated: Number,
});


const model = mongoose.model('trade.transactions', schema, 'trade.transactions');

schema.pre('save', function (next) {
    let self = this;
    if (self.isNew) {
        self.created = self.updated = moment().unix();
    } else {
        self.updated = moment().unix();
    }
    next();
});

module.exports = model;
