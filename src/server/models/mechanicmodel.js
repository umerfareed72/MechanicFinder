const mongoose = require('mongoose');

const Mechanicschema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  phone: String,
  address: String,
  photo: String,
  carcompany: String,
  city: String,
  country: String,
  skilltype: String,
  date: String,
  vehicaltype: String,
});

mongoose.model('mechanicmodel', Mechanicschema);
