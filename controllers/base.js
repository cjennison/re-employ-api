const models = require('../db/models');
const { authenticationRequired } = require('../services/auth');

class BaseController {
  modelFields(fields) {
    if (!fields) {
      return null;
    }

    return fields.map((field) => {
      return models[field];
    });
  }

  authenticationRequired() {
    return authenticationRequired;
  }

  userMatchesClaimId(req, claimId) {
    return req.jwt.claims.uid === claimId
  }
}

module.exports = BaseController;
