const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect( process.env.MONGODBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
