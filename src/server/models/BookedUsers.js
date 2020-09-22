const mongoose = require('mongoose');
const BookedUserschema = new mongoose.Schema({
  userid: String,
  mechanicid:String,
  Status:String
});

mongoose.model('BookedUsermodel', BookedUserschema);
