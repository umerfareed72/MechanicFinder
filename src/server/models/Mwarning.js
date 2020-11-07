const mongoose = require('mongoose');
const Mwarning = new mongoose.Schema({
  warning:String,
  mdbid: String,
});

mongoose.model('Mwarning', Mwarning);