const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  photo: String,
  city: String,
  country: String,
  date: String,

});
const UserLocationschema = new mongoose.Schema({
 longitude:String,
 latitude:String

});

mongoose.model('UserLocationmodel', UserLocationschema);

mongoose.model('Usermodel', Userschema);
