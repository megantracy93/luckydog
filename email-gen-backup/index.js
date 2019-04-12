const generatePAMeetEmail = require('./pa-meet/js/generatePAMeetEmail');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'shared', 'js')));
app.use(express.static(path.join(__dirname, 'shared', 'html')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/pa-meet', (req, res) => {
  const emailFn = generatePAMeetEmail();
  emailFn.then((email) => {
    res.send(email);
  }).catch(err => {
    res.send(err);
  });
});

app.listen(65535, () => console.log('Email Generator listening on port 65535!'))