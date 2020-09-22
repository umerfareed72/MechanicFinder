const express = require('express');
const mongoose = require('mongoose');
const {jwtkey} = require('../keys');
const router = express.Router();
const jwt = require('jsonwebtoken');
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
  BookedUsermodel.find({mechanicid:req.params.mid,Status:'Online'})
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
    Status:'Offline'
    },
  )
    .then((canceluser) => {
      if (!canceluser) {
        return res.status(404).send('Mechanic Not Found');
      } else {
        // mechanic.update();
        return res.status(200).json(canceluser);
      }
    })
    .catch((error) => {
      return res.send(error);
    });
});


// router.get('/getUserProfile/:mid/:uid/:bid', async (req, res) => {
//   Usermodel.findById(req.params.uid)
//     .select({
//       firstname: 1,
//       lastname: 1,
//       email: 1,
//       address: 1,
//       city: 1,
//       country: 1,
//       photo: 1,
//       phone: 1,
//       latitude: 1,
//       longitude: 1,
//     })
//     .then((user) => {
//       Mechanicmodel.findById(req.params.mid).then((data) => {
//         BookedUsermodel.findById(req.params.bid).then((data) => {
//           res.json(data);
//         });
//       });
//     })
//     //  res.send(userdata)
//     .catch((err) => {
//       res.status(404).send(err.message);
//     });
// });

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


module.exports = router;
