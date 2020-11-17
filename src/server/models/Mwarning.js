const mongoose = require('mongoose');
const Mwarning = new mongoose.Schema({
  warning:{type:String,required:'Description is Required'},
  mdbid: String,
  date:Date,

});

mongoose.model('Mwarning', Mwarning);
