const express = require('express');
const mongoose = require('mongoose');
const {jwtkey} = require('../keys');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usermodel = mongoose.model('Usermodel');

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
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    city: req.body.city,
    country: req.body.country,
    date: req.body.date,
  });

  User.save()
    .then((data) => {
      // console.log(data);
      // res.send(data);
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

//Get user By id
router.get('/user/:id', (req, res) => {
  Usermodel.findById(req.params.id).select({
    firstname:1,
    lastname:1,
    latitude:1,
    longitude:1,
    email:1,
    phone:1,
    photo:1,
    address:1,
    city:1,
    country:1


  })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User Not Found');
      }
      return res.status(200).json(user);
    })
    .catch((error) => {
      return res.send(error);
    });
});

//Update User Lat & Long
router.put('/userlocation/:id', (req, res) => {
  Usermodel.findByIdAndUpdate(
    {_id: req.params.id},
    {
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send('User Not Found');
      } else {
        // user.update();
        return res.status(200).json(user);
      }
    })

    .catch((error) => {
      return res.send(error);
    });
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
      latitude: 1,
      longitude: 1,
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

module.exports = router;
