const mongoose = require('mongoose');

const mechanicschema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  photo: String,
  carcompany: String,
  city: String,
  country: String,
  skilltype: String,
  date: String,
  VehicalType: String,
});

mongoose.model('mechanicmodel', mechanicschema);
