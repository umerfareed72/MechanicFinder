const mongoose = require('mongoose');
const suggestions = new mongoose.Schema({
  firstname:String,
  suggestion: String,
  issueid:String,
  mid:String,
  mphoto:String
});

mongoose.model('suggestions', suggestions);