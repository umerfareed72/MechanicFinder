const mongoose = require('mongoose');
const mechanicreport = new mongoose.Schema({
  reportdescription:String,
  reporttype: String,
  userdbid:String,
  mdbid:String,
  date:String
});

mongoose.model('mechanicreport', mechanicreport);