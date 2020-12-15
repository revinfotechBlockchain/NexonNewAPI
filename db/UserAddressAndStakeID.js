const mongoose = require('mongoose');

var UserAddressAndStakeID = new mongoose.Schema({
    StakeId: {
        type: Number,
        required: 'This field is required.'
    },
    StakerAddress: {
        type: String,
        required: 'This field is required.'
    },
    StakingStartTime: {
        type: String,
        required: 'This field is required.'
    },
    StakingEndTime: {
        type: String,
        required: 'This field is required.'
    },
    StakerTokens: {
        type: String,
        required: 'This field is required.'
    },
    TokenTransactionstatus: {
        type: String,
        required: 'This field is required.'
    },
    Interest: {
        type: Number,
        required: 'This field is required.'
    },
    Amount: {
        type: Number,
        required: 'This field is required.'
    },
    BigPayDay: {
        type: Number,
        required: 'This field is required.'
    },
    Shares: {
        type: Number,
        required: 'This field is required.'
    }

});

mongoose.model('UserAddressAndStakeID', UserAddressAndStakeID);