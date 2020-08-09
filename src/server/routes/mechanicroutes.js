const express = require('express');
const mongoose = require('mongoose');
const {jwtkey} = require('../keys');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Mechanicmodel = mongoose.model('mechanicmodel');

// router.get('/', (req, res) => {
//   Mechanicmodel.find({})
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

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
    date: req.body.date,
    VehicalType: req.body.VehicalType,
    skilltype: req.body.skilltype,
    date: req.body.date,
    vehicletype: req.body.vehicletype,
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
      res.status(422).send(err.message);
    });
});
router.post('/mechnanicsignin', async (req, res) => {
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

router.post('/deletemechanic', (req, res) => {
  Mechanicmodel.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/updatemechanic', (req, res) => {
  Mechanicmodel.findByIdAndUpdate(req.body.id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    photo: req.body.photo,
    carcompany: req.body.carcompany,
    vehicaltype: req.body.vehicaltype,
    city: req.body.city,
    country: req.body.country,
    skilltype: req.body.skilltype,
    date: req.body.data,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
