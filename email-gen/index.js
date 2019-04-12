const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User'); // create mongo collection
require('./models/EventProperties'); // create mongo collection
require('./services/passport'); // init services

mongoose.connect(keys.mongoUri);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json()); // allow body parsing in express route handlers

require('./routes/authRoutes')(app); // register routes
require('./routes/emailPropRoutes')(app);
require('./routes/eventPropRoutes')(app);
require('./routes/paPropRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // serve up production assets, like main.js
  app.use(express.static('client/build'));
  const path = require('path');
  // serve up index.html if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });

}

app.listen(process.env.PORT || 5000);