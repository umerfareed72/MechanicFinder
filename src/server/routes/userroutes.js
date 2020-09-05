const express = require('express');
const mongoose = require('mongoose');
const {jwtkey} = require('../keys');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usermodel = mongoose.model('Usermodel');
const UserLocationmodel = mongoose.model('UserLocationmodel');

//User Portion
//User Register

router.post('/userregister', (req, res) => {
  const User = new Usermodel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    photo: req.body.photo,
    longitude:req.body.longitude,
    latitude:req.body.latitude,
    city: req.body.city,
    country: req.body.country,
    date: req.body.date,
  });

  User.save()
    .then((data) => {
    //   console.log(data);
    //   res.send(data);
    const token = jwt.sign({userid: User._id}, jwtkey);
    res.send({token});
      
})
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

//User Login

router.post('/usersignin', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(422).send({error: 'Provide Email and Password Both!!'});
  }
  const user = await Usermodel.findOne({email});
  if (!user) {
    return res.status(422).send({error: 'Email not exist!!'});
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({userid: user._id}, jwtkey);
    res.send({token});
  } catch (err) {
    return res.status(422).send({error: 'Password not exist!!'});
  }
});

//Get Current User

router.get('/meUser', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, jwtkey, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      res.status(200).send(decoded);
    });
  });




//Add User longitude and latitude
router.post('/adduserlocation', (req, res) => {
  const location = new UserLocationmodel({
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

//Update User Lat & Long
router.patch('/updateuserlocation', (req, res) => {
  
  Usermodel.findByIdAndUpdate(
    req.body.userid,
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

//Get Users Location
router.get('/getuserlocation', (req, res) => {
  async function get() {
    const location = await UserLocationmodel.find().select({
      longitude: 1,
      latitude: 1,
    });
    if (!location) return res.status(404).send('Not Found');
    res.send(location);
  }
  get();
});


//Get all Users
router.get('/users', (req, res) => {
  async function get() {
    const users = await Usermodel.find().sort('id').select({
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










//Delete User

router.post('/deleteUser', (req, res) => {
  Usermodel.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
