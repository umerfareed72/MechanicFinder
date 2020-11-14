const mongoose = require('mongoose');
const mhelp = new mongoose.Schema({
    question:String,
    message:String,
    userid:String,
    userimage:String
});

mongoose.model('mhelp', mhelp);