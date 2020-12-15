const mongoose = require('mongoose');

var TransformTokens = new mongoose.Schema({
    Day: {
        type: Number,
        required: 'This field is required.'
    },
    NEXONAvailable: {
        type: String,
        required: 'This field is required.'
    },
    TotalETH: {
        type: String,
        required: 'This field is required.'
    },
    NEXONETH: {
        type: String,
        required: 'This field is required.'
    },
    Closing: {
        type: String,
        required: 'This field is required.'
    },
    YourNEXON: {
        type: String,
        required: 'This field is required.'
    },
    YourETH: {
        type: String,
        required: 'This field is required.'
    }
});

mongoose.model('TransformTokens', TransformTokens);