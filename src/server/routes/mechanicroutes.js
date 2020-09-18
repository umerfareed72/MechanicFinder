const express = require('express');
const mongoose = require('mongoose');
const {jwtkey} = require('../keys');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Mechanicmodel = mongoose.model('mechanicmodel');

const Usermodel = mongoose.model('Usermodel');

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

router.get('/me', function (req, res) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(401).send({auth: false, message: 'No token provided.'});

  jwt.verify(token, jwtkey, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({auth: false, message: 'Failed to authenticate token.'});

    res.status(200).send(decoded);
  });
});

//Update Mechanic Lat and Long
//Update User Lat & Long
router.put('/mechaniclocation', (req, res) => {
  Mechanicmodel.findByIdAndUpdate({
    mechanicid: req.body.mechanicid,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  })
    .then((mechanic) => {
      if (!mechanic) {
        return res.status(404).send('Mechanic Not Found');
      }
      return res.status(200).json(mechanic);
    })
    .catch((error) => {
      return res.send(error);
    });
});

//Get Mechanic By Id
router.get('/mechanic/:id', (req, res) => {
  Mechanicmodel.findById(req.params.id)
    .sort('id')
    .select({
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
      latitude: 1,
      longitude: 1,
    })
    .then((mechanic) => {
      if (!mechanic) {
        return res.status(404).send('Mechanic Not Found');
      }
      return res.status(200).json(mechanic);
    })
    .catch((error) => {
      return res.send(error);
    });
});

//Get all Mechanics

router.get('/mechanics', (req, res) => {
  async function get() {
    const mechanics = await Mechanicmodel.find().sort('id').select({
      firstname: 1,
      lastname: 1,
      email: 1,
      password: 1,
      phone: 1,
      address: 1,
      latitude: 1,
      longitude: 1,
      photo: 1,
      carcompany: 1,
      city: 1,
      country: 1,
      skilltype: 1,
      vehicletype: 1,
      date: 1,
    });
    if (!mechanics) return res.status(404).send('Not Found');
    res.send(mechanics);
  }
  get();
});

router.get(
  '/nearmechanics/:skilltype/:vehicletype/:carcompany/:id',
  (req, res) => {
    var latitude;
    var longitude;
    var nearest = [];
    Usermodel.findById(req.params.id)
      .sort('id')
      .select({
        longitude: 1,
        latitude: 1,
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send('User Not Found');
        }
        // return res.status(200).json(user);
        latitude = user.latitude;
        longitude = user.longitude;
      })
      .then((near) => {
        Mechanicmodel.find({
          skilltype: req.params.skilltype,
          vehicletype: req.params.vehicletype,
          carcompany: req.params.carcompany,
        })
          .sort('id')
          .select({
            firstname: 1,
            lastname: 1,
            email: 1,
            phone: 1,
            city: 1,
            address: 1,
            country: 1,
            carcompany: 1,
            skilltype: 1,
            vehicletype: 1,
            longitude: 1,
            latitude: 1,
          })
          .then((mechanics) => {
            if (!mechanics) return res.status(404).send('Not Found');
            mechanics.map((item) => {
              let Lat1 = latitude / 57.29577951;
              let Lat2 = item.latitude / 57.29577951;
              let Long1 = longitude / 57.29577951;
              let Long2 = item.longitude / 57.29577951;
              // Calaculate distance
              let dlat = Lat2 - Lat1;
              let dlong = Long2 - Long1;
              //Apply Heversine Formula to calculate  Distance of Spherical Objects
              let a =
                Math.pow(Math.sin(dlat / 2), 2) +
                Math.cos(Lat1) *
                  Math.cos(Lat2) *
                  Math.pow(Math.sin(dlong / 2), 2);
              let c = 2 * Math.asin(Math.sqrt(a));
              let r = 6371;
              let result = c * r; //Get Result In KM
              //Found In 10 KM

              if (result <= 50) {
                //Distance get
                nearest.push({
                  mechanicid: item.id,
                  firstname: item.firstname,
                  lastname: item.lastname,
                  email: item.email,
                  phone: item.phone,
                  carcompany: item.carcompany,
                  vehicletype: item.vehicletype,
                  skilltype: item.skilltype,
                  address: item.address,
                  country: item.country,
                  city: item.city,
                  address: item.address,
                  latitude: item.latitude,
                  longitude: item.longitude,
                  distance: Math.trunc(result),
                });
              }
            });
            return res.json(nearest);
          })
          .catch((error) => {
            return res.send(error);
          });
      });
  },
);

module.exports = router;
