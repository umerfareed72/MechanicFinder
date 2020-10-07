const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const BookProductmodel = mongoose.model('BookProductmodel');
const ProductModel = mongoose.model('ProductModel');
const Mechanicmodel = mongoose.model('mechanicmodel');
//Mechanic Registeration
router.post('/addbuyProduct', async (req, res) => {
  const add = new BookProductmodel({
      userid: req.body.userid,
      mechanicid:req.body.mechanicid,
      title:req.body.title,
      amount:req.body.amount,
      paymentMethod:req.body.paymentMethod,
      quantity: req.body.quantity,
      description:req.body.description,
      photo:req.body.photo,
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

router.get('/getbuyProduct/:id/:mid', (req, res) => {
  async function get() {
    const product = await BookProductmodel.find({
      userid: req.params.id,
      mechanicid:req.params.mid,
      status: 'Online',
    })
      if (!product) return res.status(404).send('Not Found');
    res.send(product);
  }
  get();
});

router.delete('/deletebuyProduct/:id', (req, res) => {
  async function get() {
    const product = await BookProductmodel.findByIdAndDelete({
      _id: req.params.id,
      status:'Online'
    });
    if (!product) return res.status(404).send('Not Found');
    res.send(product);
  }
  get();
});


router.put('/bookedbuyProduct/:id', (req, res) => {
  BookProductmodel.findByIdAndUpdate(
    {_id: req.params.id},
    {
      status: 'Offline',
    },
  )
    .then((product) => {
      
      if (!product) {
        return res.status(404).send('Mechanic Not Found');
      } else {
        return res.status(200).json(product);
          }
    })
    .catch((error) => {
      return res.send(error);
    });
});





module.exports = router;
