const db = require('./db/models');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controllers = require('./controllers/index');
const queue = require('./jobs/queue');
const jobs = require('./jobs/index');
const kue = require('kue');

const Scheduler = require('./jobs/scheduler');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/queue', kue.app);
app.use('/status', (req, res) => res.send(200));

app.use(cors());
controllers(app);

const server = app.listen(3000, () => console.log('Started on port 3000!'));

db.sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connection has been established successfully.');
    queue.listen(() => {
      Scheduler.scheduleDefault();
      
      //DEBUG TEST JOBS
      //new jobs.creators.HealthCheckJobCreator(queue.getQueue()).createJob();
      //new jobs.processors.OpenPositionSearchJobDispatcherJob({}, ()=>{}, queue.getQueue()).process();
      //new jobs.creators.UserJobOpeningDailyDispatcherJobCreator(queue.getQueue()).createJob();
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = server;
