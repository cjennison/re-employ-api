const User = require('./user');
const Job = require('./job');

module.exports = (app) => {
  new User(app);
  new Job(app);
};
