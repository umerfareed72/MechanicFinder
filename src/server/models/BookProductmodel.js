const mongoose = require('mongoose');
const BookProductschema = new mongoose.Schema({
  userid: String,
  productid:String,
  quantity:{type:Number},
paymentMethod:String,
status:String
});

mongoose.model('BookProductmodel', BookProductschema);
