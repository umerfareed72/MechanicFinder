const mongoose = require('mongoose');
const uhelp = new mongoose.Schema({
    question:String,
    message:String,
    userid:String,
    userimage:String
});

mongoose.model('uhelp', uhelp);