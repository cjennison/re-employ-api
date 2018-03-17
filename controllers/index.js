const User = require('./user')

module.exports = (app) => {
  new User(app);
};