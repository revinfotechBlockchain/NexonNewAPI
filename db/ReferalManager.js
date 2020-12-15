const mongoose = require('mongoose');

var ReferalManager = new mongoose.Schema({
    UserAddress: {
        type: String,
        required: 'This field is required.'
    },
    Used: {
        type: Boolean,
        required: 'This field is required.'
    },
    Date: {
        type: String,
        required: 'This field is required.'
    },
    UsedAddress: {
        type: String,
        required: 'This field is required.'
    },
    ReferalCode : {
        type: String,
        required: 'This field is required.'
    },
    Amount : {
        type: Number,
        required: 'This field is required.'
    },
    Details : {
        type: String,
        required: 'This field is required.'
    },
});

mongoose.model('ReferalManager', ReferalManager);