const models = require('../db/models');
const _ = require('lodash');
const { authenticationRequired } = require('../services/auth');

class BaseController {
  modelFields(fields) {
    if (!fields) {
      return null;
    }

    return fields.map(field => models[field]);
  }

  authenticationRequired() {
    return authenticationRequired;
  }

  userHasRole(jwt, requiredRole) {
    return new Promise((resolve, reject) => {
      models.User.find({
        where: {
          uid: jwt.claims.uid
        },
        include: [models.Role]
      }).then((user) => {
        const hasRole = _.some(user.Roles, role => requiredRole === role.name);

        if (hasRole) {
          return resolve(hasRole);
        }

        return reject(hasRole);
      });
    });
  }

  userMatchesClaimId(req, claimId) {
    return req.jwt.claims.uid === claimId;
  }
}

module.exports = BaseController;
