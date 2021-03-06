'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const keys = require('./config/keys');

// DB Stuff
require('./src/models');
mongoose.connect(keys.mongoUri);

// Other setup
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const app = express();

app.set('port', (process.env.PORT || 9107));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Auth stuff
require('./src/passport');
app.use(session({ secret: keys.sessionSecret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./src/control')(app);

// Prod setup
if (process.env.NODE_ENV === 'production') {
  // express serves up production assets (main.js, main.css, etc)
  // if any get request comes in and we don't have a handler,
  // then look into that directory and see if we can find it
  app.use(express.static('client/build'));

  // express serves up index.html if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start the server
let server = app.listen(app.get('port'), function () {
  console.log(`Listening on port: ${app.get('port')}`);
});

module.exports = server;