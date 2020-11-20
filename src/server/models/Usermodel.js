const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const Userschema = new mongoose.Schema({
  firstname: {type: String, required: 'FirstName is required'},
  lastname: {type: String, required: 'LastName is required'},
  nickname:{type: String, required: 'LastName is required'},
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
  city: {type: String, required: 'City is required'},
  country: {type: String, required: 'Country is required'},
  longitude: String,
  latitude: String,
  date: {type: String, required: 'Date of Birth Required is required'},
  blocked:Boolean
});


Userschema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
console.log(user.password);
      next();
    });
  });
});
Userschema.methods.comparePassword = function (candidatepassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatepassword, user.password, (err, isMatch) => {
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





mongoose.model('Usermodel', Userschema);
