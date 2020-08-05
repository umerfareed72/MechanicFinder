const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

require('./models/mechanicmodel');
const mechanicroutes = require('./routes/mechanicroutes');
app.use(bodyparser.json());
app.use(mechanicroutes);

const mongouri =
  'mongodb+srv://cnq:K6ARnxxT57GFnOTQ@cluster0-xkczw.mongodb.net/test?retryWrites=true&w=majority';
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
