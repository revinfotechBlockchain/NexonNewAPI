const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/NexonAPI',{userNewUrlParser: true}, (err) =>{
    if(!err){
        console.log('MongoDB connected successfully')
    }
    else{
        console.log('Error in connecting Mongodb', +err);
    }
})

require('./ReferalManager');
require('./UserAddressAndStakeID');
require('./TransformTokens');
require('./BTCDatabase');