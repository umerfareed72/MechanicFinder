const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Mechanicmodel = mongoose.model('mechanicmodel');
const Usermodel = mongoose.model('Usermodel');
const BookedUsermodel = mongoose.model('BookedUsermodel');

/////////////////////////////Get All  Booked Users//////////////////////////////////

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



//////////////////////////////////Add Booking///////////////////////////////////////

router.post('/addbookedUser/:mid/:uid/:totalamount', async (req, res) => {
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
          totalamount:req.params.totalamount,
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

//////////////////////////////////Get Book User///////////////////////////////


router.get('/getbookedUser/:mid', async (req, res) => {
  BookedUsermodel.find({mechanicid: req.params.mid, Status: 'Online'})
    .then((bookeduser) => {
      res.json(bookeduser);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});






/////////////////////////////////Cancel Booked User//////////////////////////////////

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
//Earning Calculation
router.get('/bookedmid/:id', async (req, res) => {
  BookedUsermodel.find({mechanicid:req.params.id})
    .then((data) => {
      res.json(data);
    })
    //  res.send(userdata)
    .catch((err) => {
      res.status(404).send(err.message);
    });
});


//////////////////////////// Complete Booking From Mechanic///////////////////

router.put('/completebooking/:id/:totalamount', (req, res) => {
  BookedUsermodel.findByIdAndUpdate(
    {_id: req.params.id},
    {
      totalamount:req.params.totalamount,
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


///////////////////////////////////////  Get Booked Data///////////////////////////////////////

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



router.get(
  '/mechanics/:id',
  (req, res) => {
    var nearest = [];
    BookedUsermodel.find({userid:req.params.uid})
      .sort('id')
        .then((user) => {
        if (!user) {
          return res.status(404).send('User Not Found');
        }
        // return res.status(200).json(user);
        })
      .then((near) => {
        Mechanicmodel.find()
          .sort('id')
          .select({
            firstname: 1,
            lastname: 1,
            email: 1,
            phone: 1,
            photo: 1,
            city: 1,
            address: 1,
            country: 1,
            carcompany: 1,
            skilltype: 1,
            vehicletype: 1,
            mechanicrate: 1,
            longitude: 1,
            latitude: 1,
            rating:1
          })
          .then((mechanics) => {
            if (!mechanics) return res.status(404).send('Not Found');
            mechanics.map((item) => {
        
                //Distance get
                nearest.push({
                  mechanicid: item.id,
                  firstname: item.firstname,
                  lastname: item.lastname,
                  email: item.email,
                  photo: item.photo,
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
                  mechanicrate: item.mechanicrate,
                  rating:item.rating,
                });
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
