const mongoose = require('mongoose');
const BookedUserschema = new mongoose.Schema({
  userid: String,
  mechanicid:String,
  totalamount:{type:Number,required:'Amount is Required'},
  Status:String
});

mongoose.model('BookedUsermodel', BookedUserschema);
