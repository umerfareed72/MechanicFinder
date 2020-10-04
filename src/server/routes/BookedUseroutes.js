const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Mechanicmodel = mongoose.model('mechanicmodel');
const Usermodel = mongoose.model('Usermodel');
const BookedUsermodel = mongoose.model('BookedUsermodel');

router.post('/addbookedUser/:mid/:uid', async (req, res) => {
  Usermodel.findById(req.params.uid)
    .select({
      firstname: 1,
      lastname: 1,
      email: 1,
      address: 1,
      city: 1,
      country: 1,
      photo: 1,
      phone: 1,
      latitude: 1,
      longitude: 1,
    })
    .then((user) => {
      Mechanicmodel.findById(req.params.mid).then((data) => {
        const bookeduser = new BookedUsermodel({
          userid: req.params.uid,
          mechanicid: req.params.mid,
          Status: 'Online',
        });
        bookeduser.save();
        res.json(bookeduser);
      });
    })
    //  res.send(userdata)
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/getbookedUser/:mid', async (req, res) => {
  BookedUsermodel.find({mechanicid: req.params.mid, Status: 'Online'})
    .then((bookeduser) => {
      res.json(bookeduser);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.put('/cancelbookeduser/:id', (req, res) => {
  BookedUsermodel.findByIdAndUpdate(
    {_id: req.params.id},
    {
      Status: 'Offline',
    },
  )
    .then((canceluser) => {
      if (!canceluser) {
        return res.status(404).send('Mechanic Not Found');
      } else {
        return res.status(200).json(canceluser);
        canceluser.save();
      }
    })
    .catch((error) => {
      return res.send(error);
    });
});


router.get('/bookedusers', async (req, res) => {
  BookedUsermodel.find()
    .then((data) => {
      res.json(data);
    })
    //  res.send(userdata)
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/bookeduserid/:id', async (req, res) => {
  BookedUsermodel.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    //  res.send(userdata)
    .catch((err) => {
      res.status(404).send(err.message);
    });
});
//////////////////////////////////////User Side Booked Mechanic Routes///////////////

router.get('/getbookedMechanic/:uid', async (req, res) => {
  BookedUsermodel.find({userid: req.params.uid, Status: 'Online'})
    .then((bookedmechanic) => {
      if (bookedmechanic.length == 0) {
        return res.status(202).send(null);
      }
      return res.json(bookedmechanic);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});



module.exports = router;
