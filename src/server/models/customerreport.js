const mongoose = require('mongoose');
const customerreport = new mongoose.Schema({
  reportdescription:String,
  reporttype: String,
  userdbid:String,
  mdbid:String,
  date:String,
  mechanicphoto:String
});

mongoose.model('customerreport', customerreport);