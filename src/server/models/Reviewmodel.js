const mongoose = require('mongoose');
const ReviewModelschema = new mongoose.Schema({
  userid:String,
  mechanicid: String,
  firstname:String,
  lastname:String,
  photo:String,
  rating:String,
  description:String
});

mongoose.model('ReviewModel', ReviewModelschema);
