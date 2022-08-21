const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Transaction = new Schema({
    transaction_label: {
        type: String,
        required: true
    },
    transaction_value: {
        type: String,
        required: true
    },
    transaction_type: {
        type: String,
        required: true
    }
    // id: {
    //     type: String,
    //     required: true
    // }
});

module.exports = mongoose.model('Transaction', Transaction);