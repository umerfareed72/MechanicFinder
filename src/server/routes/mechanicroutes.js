const express = require('express');
const mongoose = require('mongoose');
const {jwtkey} = require('../keys');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Mechanicmodel = mongoose.model('mechanicmodel');
const Locationmodel = mongoose.model('Locationmodel');



//Mechanic Login
router.post('/mechanicsignin', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(422).send({error: 'Provide Email and Password Both!!'});
  }
  const mechanic = await Mechanicmodel.findOne({email});
  if (!mechanic) {
    return res.status(422).send({error: 'Email not exist!!'});
  }
  try {
    await mechanic.comparePassword(password);
    const token = jwt.sign({mechanicid: mechanic._id}, jwtkey);
    res.send({token});
  } catch (err) {
    return res.status(422).send({error: 'Password not exist!!'});
  }
});


//Mechanic Registeration
router.post('/mechanicregister', async (req, res) => {
  const mechanic = new Mechanicmodel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    photo: req.body.photo,
    carcompany: req.body.carcompany,
    city: req.body.city,
    country: req.body.country,
    skilltype: req.body.skilltype,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    vehicletype: req.body.vehicletype,
    date: req.body.date,
  });

  await mechanic
    .save()
    .then(() => {
      const token = jwt.sign({mechanicid: mechanic._id}, jwtkey);
      res.send({token});
    })
    // .then((data) => {
    //
    //   // res.send(data);
    // })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/me', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, jwtkey, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    res.status(200).send(decoded.userid);
  
  });
});

//Add Mechanic longitude and latitude
router.post('/addmechaniclocation', (req, res) => {
  const location = new Locationmodel({
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  });

  location
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

//Update Mechanic Lat & Long
router.patch('/updatemechaniclocation', (req, res) => {
  
  Mechanicmodel.findByIdAndUpdate(
    req.body.mechanicid,
    {longitude: req.body.longitude, latitude: req.body.latitude},
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log('Updated User : ', docs);
        res.send(docs);
      }
    },
  );
});
//Get Mechanics Location
router.get('/getmechaniclocation', (req, res) => {
  async function get() {
    const location = await Locationmodel.find().select({
      longitude: 1,
      latitude: 1,
    });
    if (!location) return res.status(404).send('Not Found');
    res.send(location);
  }
  get();
});


//Get all Mechanics
router.get('/mechanics', (req, res) => {
  async function get() {
    const users = await Mechanicmodel.find().sort('id').select({
      firstname: 1,
      lastname: 1,
      email: 1,
      password: 1,
      phone: 1,
      address: 1,
      photo: 1,
      carcompany: 1,
      city: 1,
      country: 1,
      skilltype: 1,
      vehicletype: 1,
      date: 1,
    });
    if (!users) return res.status(404).send('Not Found');
    res.send(users);
  }
  get();
});
//User Portion

module.exports = router;
