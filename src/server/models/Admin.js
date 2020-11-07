const mongoose = require('mongoose');
const Adminschema = new mongoose.Schema({
  email: String,
  password:String,
  
});

mongoose.model('Adminschema', Adminschema);
