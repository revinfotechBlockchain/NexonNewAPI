const mongoose = require('mongoose');

var BTCDatabase = new mongoose.Schema({
    Id: {
        type: Number,
        required: 'This field is required.'
    },
    Day: {
        type: String,
        required: 'This field is required.'
    },
    BTCAddress: {
        type: String,
        required: 'This field is required.'
    },
    BTCAmount: {
        type: String,
        required: 'This field is required.'
    },
    ClaimRYZ: {
        type: String,
        required: 'This field is required.'
    },
    UserTronAddress: {
        type: String,
        required: 'This field is required.'
    },
});

mongoose.model('BTCDatabase', BTCDatabase);