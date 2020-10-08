const mongoose = require('mongoose');
const BookProductschema = new mongoose.Schema({
  userid: {type:String,required:'Userid is Required'},
  mechanicid:{type:String,required:'Mechanic id is Required'},
  productid:{type:String,required:'Product id is Required'},
  title:{type:String,required:'Title is required'},
  amount:{type:Number,required:'Price is Required'},
  quantity:{type:Number,required:'Quantity is Required'},
  paymentMethod:{type:String,required:'Payment Method is required'},
  description:{type:String,required:'Description is required'},
  photo:String,
  status:String,


});

mongoose.model('BookProductmodel', BookProductschema);
