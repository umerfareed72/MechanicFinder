const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('./models/mechanicmodel');
const mechanicroutes1 = require('./routes/mechanicroutes');
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(mechanicroutes1);

const mongouri =
  // 'mongodb+srv://cnq:K6ARnxxT57GFnOTQ@cluster0-xkczw.mongodb.net/test?retryWrites=true&w=majority';
"mongodb+srv://Umerfareed:20Rupees@cluster0.jobcl.mongodb.net/mechanicregister?retryWrites=true&w=majority"
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

app.listen(3000, () => {
  console.log('listening on 3000');
});
