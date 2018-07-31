const generateEmail = require('./src/js/main');
const express = require('express')

const app = express();

app.get('/', (req, res) => {
  const emailFn = generateEmail();
  emailFn.then((email) => {
    res.send(email);
  });
});

app.listen(3000, () => console.log('Email Generator listening on port 3000!'))