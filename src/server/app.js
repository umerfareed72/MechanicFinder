const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

require('./models/mechanicmodel');
const requiretoken = require('./middlewares/requiretoken');
require('./models/Usermodel');
const usertoken = require('./middlewares/Usertoken');
require('./models/BookProductmodel');
require('./models/BookedUsers');
require('./models/Reviewmodel');
require('./models/ProductModel');
const mechanicroutes1 = require('./routes/mechanicroutes');
const userroutes1 = require('./routes/Userroutes');
const bookedroutes = require('./routes/BookedUseroutes');
const Productroutes = require('./routes/Productroute');
const BookProductroutes = require('./routes/BookProductroutes');

app.use(bodyParser.json({limit: '50mb'}));
app.use(mechanicroutes1);
app.use(userroutes1);
app.use(bookedroutes);
app.use(Productroutes);
app.use(BookProductroutes);
const mongouri =
  // 'mongodb+srv://cnq:K6ARnxxT57GFnOTQ@cluster0-xkczw.mongodb.net/test?retryWrites=true&w=majority';
  'mongodb+srv://Umerfareed:20Rupees@cluster0.jobcl.mongodb.net/SmartAutoMechanicFinder?retryWrites=true&w=majority';
// "mongodb+srv://Umerfareed:20Rupees@cluster0.jobcl.mongodb.net/test"
mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo');
});
mongoose.connection.on('error', (err) => {
  console.log('error', err);
});
app.get('/', requiretoken, (req, res) => {
  res.send('your email is ' + req.mechanic.email);
});
app.get('/', usertoken, (req, res) => {
  res.send('your email is ' + req.user.email);
});
app.listen(3000, () => {
  console.log('listening on 3000');
});
