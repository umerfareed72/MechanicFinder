const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Mechanicmodel = mongoose.model('mechanicmodel');
const ProductModel = mongoose.model('ProductModel');

//Mechanic Registeration
router.post('/addProduct', async (req, res) => {
  const mechanic = new ProductModel({
    mechanicid: req.body.mechanicid,
    title: req.body.title,
    price: req.body.price,
    quantity: req.body.quantity,
    paymentMethod: req.body.paymentMethod,
    description: req.body.description,
    photo: req.body.photo,
  });
  await mechanic
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/getProduct/:id', (req, res) => {
  async function get() {
    const mechanics = await ProductModel.find({mechanicid: req.params.id})
      .sort('id')
      .select({
        mechanicid: 1,
        title: 1,
        photo: 1,
        price: 1,
        quantity: 1,
        paymentMethod: 1,
        description: 1,
      });
    if (!mechanics) return res.status(404).send('Not Found');
    res.send(mechanics);
  }
  get();
});
router.get('/getProducts', (req, res) => {
  async function get() {
    const mechanics = await ProductModel.find()
      .sort('id')
      .select({
        mechanicid: 1,
        title: 1,
        photo: 1,
        price: 1,
        quantity: 1,
        paymentMethod: 1,
        description: 1,
      });
    if (!mechanics) return res.status(404).send('Not Found');
    res.send(mechanics);
  }
  get();
});


router.put('/updateProduct/:id', (req, res) => {
  async function get() {
    const product = await ProductModel.findByIdAndUpdate({_id:req.params.id},{
      title: req.body.title,
      price: req.body.price,
      quantity: req.body.quantity,
      paymentMethod: req.body.paymentMethod,
      description: req.body.description,
      photo: req.body.photo,
    })
    if (!product) return res.status(404).send('Not Found');
    res.send(product);
  }
  get();
});
router.delete('/deleteProduct/:id', (req, res) => {
  async function get() {
    const product = await ProductModel.findByIdAndDelete({_id:req.params.id})
    if (!product) return res.status(404).send('Not Found');
    res.send(product);
  }
  get();
});


module.exports = router;
