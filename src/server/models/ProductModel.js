const mongoose = require('mongoose');
const Productschema = new mongoose.Schema({
  mechanicid: String,
  title:String,
  price:{type:Number},
  quantity:{type:Number},
  paymentMethod:String,
  description:String,
  photo:String
});

mongoose.model('ProductModel', Productschema);
