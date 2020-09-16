const express = require('express');
const mongoose = require('mongoose');
const {jwtkey} = require('../keys');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Mechanicmodel = mongoose.model('mechanicmodel');
const Locationmodel = mongoose.model('Locationmodel');
const Usermodel = mongoose.model('Usermodel');

//Calculate Distance
calculateDistance = (id, lat1, lat2, long1, long2) => {
  //Convert Distance in Radian by multplying lat and long with 180/pi
  let Lat1 = lat1 / 57.29577951;
  let Lat2 = lat2 / 57.29577951;
  let Long1 = long1 / 57.29577951;
  let Long2 = long2 / 57.29577951;
  // Calaculate distance
  let dlat = Lat2 - Lat1;
  let dlong = Long2 - Long1;
  //Apply Heversine Formula to calculate  Distance of Spherical Objects
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(Lat1) * Math.cos(Lat2) * Math.pow(Math.sin(dlong / 2), 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let r = 6371;
  let result = c * r; //Get Result In KM
  //Found In 10 KM

  if (result <= 10000) {
    //Distance get
    console.log(result, lat2, long2, id);
  }
};

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
//Get Mechanic By Id

//Add Mechanic longitude and latitude
router.post('/addmechaniclocation', (req, res) => {
  const location = new Locationmodel({
    mechanicid: req.body.mechanicid,
    distance: req.body.distance,
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
router.get('/getnearmechanics', (req, res) => {
  async function get() {
    const location = await Locationmodel.find().sort('id').select({
      mechanicid: 1,
      distance: 1,
    });
    if (!location) return res.status(404).send('Not Found');
    res.send(location);
  }
  get();
});

//Get all Mechanics
router.get('/nearmechanics/:id', (req, res) => {
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
      Mechanicmodel.find()
        .sort('id')
        .select({
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

            if (result <= 10000) {
              //Distance get
              console.log(Math.round(result));
              nearest.push({mechanicid: item.id, distance: result});
            }
          });
            return res.json(nearest);
         })
        .catch((error) => {
          return res.send(error);
        });
    });
});
//User Portion

module.exports = router;
