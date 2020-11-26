const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Pusher = require('pusher');
const pusherConfig = require('../../src/config/pusher.json'); // (1)
const pusherClient = new Pusher(pusherConfig);
const cors = require('cors');
require('./models/mechanicmodel');
const requiretoken = require('./middlewares/requiretoken');
require('./models/Usermodel');
const usertoken = require('./middlewares/Usertoken');
require('./models/BookProductmodel');
require('./models/BookedUsers');
require('./models/Reviewmodel');
require('./models/ProductModel');
require('./models/VehicleIssueModel');
require('./models/ServicerateModel');
require('./models/SuggestionModel');
require('./models/mechanicreport');
require('./models/Mwarning');
require('./models/Admin');
require('./models/uhelp');
require('./models/mhelp')
require('./models/upolicy');
require('./models/uterms');
require('./models/customerreport')
require('./prod')(app)
const mechanicroutes1 = require('./routes/mechanicroutes');
const userroutes1 = require('./routes/Userroutes');
const bookedroutes = require('./routes/BookedUseroutes');
const Productroutes = require('./routes/Productroute');
const BookProductroutes = require('./routes/BookProductroutes');
const Serviceroutes = require('./routes/ServiceRateroute');
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(mechanicroutes1);
app.use(userroutes1);
app.use(bookedroutes);
app.use(Productroutes);
app.use(BookProductroutes);
app.use(Serviceroutes);
const mongouri =
       //'mongodb+srv://cnq:K6ARnxxT57GFnOTQ@cluster0-xkczw.mongodb.net/test?retryWrites=true&w=majority';
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

app.post('/users/:name/messages', function(req, res) { // (5)
  console.log('User ' + req.params.name + ' sent message: ' + req.body.message);
  pusherClient.trigger('chat_channel', 'message', {
      name: req.params.name,
      message: req.body.message
  });
  res.sendStatus(204);
});
//set cors middleware
app.listen(5000, () => {
  console.log('listening on 5000');
});