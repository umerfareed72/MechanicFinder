const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  longitude:String,
  latitude:String,


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
