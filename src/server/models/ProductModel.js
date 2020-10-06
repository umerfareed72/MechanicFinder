const mongoose = require('mongoose');
const Productschema = new mongoose.Schema({
  mechanicid: String,
  title:{type:String,required:'Title is required'},
  price:{type:Number},
  quantity:{type:Number},
  paymentMethod:{type:String,required:'Payment Method is required'},
  description:{type:String,required:'Description is required'},
  photo:String
});

mongoose.model('ProductModel', Productschema);
