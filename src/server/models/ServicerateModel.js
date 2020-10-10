const mongoose = require('mongoose');
const ServiceRateschema = new mongoose.Schema({
    servicename:{type:String,required:'Services is required'},
    serviceamount:{type:Number,required:'Amount is required'},
});

mongoose.model('ServiceRateModel', ServiceRateschema);
