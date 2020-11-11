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

router.get('/getServices', (req, res) => {
  async function get() {
    const services = await ServiceRateModel.find();
    if (!services) return res.status(404).send('Not Found');
    res.send(services);
  }
  get();
});

router.get('/getService/:id', (req, res) => {
  async function get() {
    const services = await ServiceRateModel.findById(req.params.id);
    if (!services) return res.status(404).send('Not Found');
    res.send(services);
  }
  get();
});

router.delete('/deleteServices/:id', (req, res) => {
  ServiceRateModel.findByIdAndDelete({_id: req.params.id}).then((del) => {
    res.send(del);
  });
});
router.put('/updateServices/:id', (req, res) => {
  ServiceRateModel.findByIdAndUpdate(req.params.id, {
    servicename: req.body.servicename,
    serviceamount: req.body.serviceamount,
  }).then((data) => {
    res.send(data);
  });
});
module.exports = router;
