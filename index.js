const db = require('./db/models');
const express = require('express');
const bodyParser = require('body-parser');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const cors = require('cors');
const controllers = require('./controllers/index')

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());
controllers(app);

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(3000, () => console.log(`Started!`));
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });