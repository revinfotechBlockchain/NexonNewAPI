const mongoose = require('mongoose');

var pairExchangeDetail = new mongoose.Schema({
    pairName: {
        type: String,
        required: 'This field is required.'
    },
    data: {
        type: Object,
        required: 'This field is required.'
    },
    status: {
        type: Boolean,
        required: 'This field is required.'
    }
});

mongoose.model('pairExchangeDetail', pairExchangeDetail);