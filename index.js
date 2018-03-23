const db = require('./db/models');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controllers = require('./controllers/index');
const queue = require('./jobs/queue');
const jobs = require('./jobs/index');
const kue = require('kue');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/queue', kue.app);

app.use(cors());
controllers(app);

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(3000, () => console.log('Started on port 3000!'));
    queue.listen(() => {
      new jobs.creators.HealthCheckJobCreator(queue.getQueue()).createJob();
      new jobs.creators.OpenPositionSearchJobCreator(queue.getQueue()).createJob();
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
