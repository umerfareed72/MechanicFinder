const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ServiceRateModel = mongoose.model('ServiceRateModel');

//Mechanic Registeration
router.post('/addservices', async (req, res) => {
  const services = new ServiceRateModel({
    servicename: req.body.servicename,
    serviceamount: req.body.serviceamount, 
  });
  await services
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/getServices/:servicename', (req, res) => {
  async function get() {
    const services = await ServiceRateModel.find({servicename: req.params.servicename})
      .sort('id')
      .select({
        servicename: 1,
        serviceamount: 1,
         });
    if (!services) return res.status(404).send('Not Found');
    res.send(services);
  }
  get();
});
router.get('/getServices', (req, res) => {
  async function get() {
    const services = await ServiceRateModel.find()
       if (!services) return res.status(404).send('Not Found');
    res.send(services);
  }
  get();
});


module.exports = router;
