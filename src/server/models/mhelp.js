const mongoose = require('mongoose');
const mhelp = new mongoose.Schema({
    question:{type:String,required:'Question is Required'},
    message:{type:String,required:'Message is Required'},
    userid:String,
    userimage:String
});

mongoose.model('mhelp', mhelp);