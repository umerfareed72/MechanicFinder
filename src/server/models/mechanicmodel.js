const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  vehicletype: String,
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
