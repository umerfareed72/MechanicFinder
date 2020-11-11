const mongoose = require('mongoose');
const vehicalissueschema = new mongoose.Schema({
  city: String,
  vehicaltype: String,
  issuetype: String,
  carcompany: String,
  phone: String,
  description: String,
  status: String,
  userdbid: String,
  userphoto:String,
  date: String,
  issuevideo:String
});

mongoose.model('vehicalissue', vehicalissueschema);