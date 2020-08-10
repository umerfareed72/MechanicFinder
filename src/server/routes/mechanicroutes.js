const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Mechanicmodel = mongoose.model('mechanicmodel');
const Usermodel = mongoose.model('Usermodel');
router.get('/', (req, res) => {
  Mechanicmodel.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/mechanicregister', (req, res) => {
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
vehicletype:req.body.vehicletype,
    date: req.body.date,
   
  });

  mechanic
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
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

router.get("/users", (req, res) => {
  async function get() {
    const users = await Usermodel.find()
      .sort("id")
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
    vehicletype:1,
        date: 1,
      });
    if (!users) return res.status(404).send("Not Found");
    res.send(users);
  }
  get();
});

router.get("/mechanics", (req, res) => {
  async function get() {
    const users = await Mechanicmodel.find()
      .sort("id")
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
    vehicletype:1,
        date: 1,
      });
    if (!users) return res.status(404).send("Not Found");
    res.send(users);
  }
  get();
});


router.post('/userregister', (req, res) => {
  const User = new Usermodel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    photo: req.body.photo,
    city: req.body.city,
    country: req.body.country,
    date: req.body.date,
   
  });

  User
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
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
    city: req.body.city,
    country: req.body.country,
    skilltype: req.body.skilltype,
    vehicaltype: req.body.vehicaltype,
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
router.post('/updateUser', (req, res) => {
  Usermodel.findByIdAndUpdate(req.body.id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    photo: req.body.photo,
    city: req.body.city,
    country: req.body.country,
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
