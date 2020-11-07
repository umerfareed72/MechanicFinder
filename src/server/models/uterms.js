const mongoose = require('mongoose');
const uterms = new mongoose.Schema({
    uterms:String,
});

mongoose.model('uterms', uterms);