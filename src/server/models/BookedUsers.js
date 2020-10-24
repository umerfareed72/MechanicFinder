const mongoose = require('mongoose');
const BookedUserschema = new mongoose.Schema({
  userid: String,
  mechanicid:String,
  totalamount:{type:Number,required:'Amount is Required'},
  mechanicname:String,
  username:String,
  mechanicphoto:String,
  userphoto:String,
  city:String,
  country:String,
  useremail:String,
  mechanicemail:String,
  Status:String
});

mongoose.model('BookedUsermodel', BookedUserschema);
