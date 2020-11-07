const mongoose = require('mongoose');
const uhelp = new mongoose.Schema({
    question:String,
    message:String,
    contact:String
});

mongoose.model('uhelp', uhelp);