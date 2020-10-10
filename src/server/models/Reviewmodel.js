const mongoose = require('mongoose');
const ReviewModelschema = new mongoose.Schema({
  userid:String,
  mechanicid: String,
  firstname:String,
  lastname:String,
  photo:String,
  rating:{type:Number,required:'Rating is required'},
  description:{type:String,required:'Description is required'},
});

mongoose.model('ReviewModel', ReviewModelschema);
