const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const BookProductmodel = mongoose.model('BookProductmodel');
const ProductModel = mongoose.model('ProductModel');

//Mechanic Registeration
router.post('/addBuyProduct', async (req, res) => {
  const add = new BookProductmodel({
    userid: req.body.userid,
    productid: req.body.productid,
    quantity: req.body.quantity,
    paymentMethod: req.body.paymentMethod,
    status: 'Online',
  });
   await add
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err.message);
    });
});

router.get('/getbuyProduct/:id', (req, res) => {
  async function get() {
    const mechanics = await BookProductmodel.find({userid: req.params.id})
      .sort('id')
      .select({
        userid: 1,
        quantity: 1,
        paymentMethod: 1,
        status: 1,
        productid: 1,
      });
    if (!mechanics) return res.status(404).send('Not Found');
    res.send(mechanics);
  }
  get();
});

router.put('/updatebuyProduct/:id/:pid', (req, res) => {
  async function get() {
    const buyproduct = await BookProductmodel.findByIdAndUpdate(
      {_id: req.params.id},
      {
        quantity: req.body.quantity,
        status: 'Offline',
      },
    ).then(async (data) => {
      const product = await ProductModel.findByIdAndUpdate(
        {_id: req.params.pid},
        {
          quantity: req.body.quantity,
        },
      ).then((res) => {
        res.send(res);
      });
    });
    if (!product) return res.status(404).send('Not Found');
  }
  get();
});
router.delete('/deletebuyProduct/:id', (req, res) => {
  async function get() {
    const product = await BookProductmodel.findByIdAndDelete({_id: req.params.id});
    if (!product) return res.status(404).send('Not Found');
    res.send(product);
  }
  get();
});

module.exports = router;
