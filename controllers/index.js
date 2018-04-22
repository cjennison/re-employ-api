const User = require('./user');
const Job = require('./job');
const Apply = require('./apply');
const Activity = require('./activity');
const Eligibility = require('./eligibility');
const JobOpening = require('./job-opening');

module.exports = (app) => {
  new User(app);
  new Job(app);
  new Apply(app);
  new Activity(app);
  new Eligibility(app);
  new JobOpening(app);
};
