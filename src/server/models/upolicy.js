const mongoose = require('mongoose');
const upolicy = new mongoose.Schema({
    policy:String,
});

mongoose.model('upolicy', upolicy);