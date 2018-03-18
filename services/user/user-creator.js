const crypto = require('crypto');
const { User } = require('../../db/models');

class UserCreator {
  create(params) {
    return User.create({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      password: this.encryptPassword(params.password),
      uid: params.uid
    });
  }

  encryptPassword(password) {
    return crypto.createHash('sha256').update(password).digest('base64');
  }
}

module.exports = UserCreator;
