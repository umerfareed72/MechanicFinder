const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Mechanic = mongoose.model('mechanicmodel');
const {jwtkey} = require('../keys');
module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  // authorization = Bearer dsssdsd
  if (!authorization) {
    return res.status(401).send({error: 'You must be logged in'});
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, jwtkey, async (err, payload) => {
    if (err) {
      return res.status(401).send({error: 'You must be logged in!'});
    }
    const {mechanicid} = payload;
    const mechanic = await Mechanic.findById(mechanicid);
    req.mechanic = mechanic;
    next();
  });
};
