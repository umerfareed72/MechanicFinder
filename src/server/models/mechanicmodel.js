const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const mechanicschema = new mongoose.Schema({
  firstname: {type: String, required: 'FirstName is required'},
  lastname: {type: String, required: 'LastName is required'},
  nickname: {type: String, required: 'nickname is required'},
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {type: String, required: 'Password is required'},
  phone: {type: Number, required: 'Phone Number is required'},
  address: {type: String, required: 'Address is required'},
  photo: String,
  mechanicrate:{type:Number,required:'Mechanic Rate is required'},
  carcompany: {type: String, required: 'Car Company is required'},
  city: {type: String, required: 'City is required'},
  country: {type: String, required: 'Country is required'},
  skilltype: {type: String, required: 'Skill Type is required'},
  longitude: String,
  latitude: String,
  vehicletype: {type: String, required: 'Vehicle Type is required'},
  rating:{type:Number,required:'Mechanic Rating is required'}, 
  date: {type: String, required: 'Date of Birth Required is required'},
  blocked:Boolean,
  code:String,
  econfirm:Boolean
});

mechanicschema.pre('save', function (next) {
  const mechanic = this;
  if (!mechanic.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(mechanic.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      mechanic.password = hash;
      next();
    });
  });
});
mechanicschema.methods.comparePassword = function (candidatepassword) {
  const mechanic = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatepassword, mechanic.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(err);
      }
      resolve(true);
    });
  });
};

mongoose.model('mechanicmodel', mechanicschema);
