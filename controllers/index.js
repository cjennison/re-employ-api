const User = require('./user');
const Job = require('./job');
const Apply = require('./apply');

module.exports = (app) => {
  new User(app);
  new Job(app);
  new Apply(app);
};
