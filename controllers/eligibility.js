const { User, Location } = require('../db/models');

const BaseController = require('./base');
const EligibilityService = require('../services/eligibility/EligibilityService');

class EligibilityController extends BaseController {
  constructor(app) {
    super(app);

    app.get('/users/:id/eligibility', (...args) => {
      this.getUserEligibility(...args);
    });
  }

  getUserEligibility(req, res) {
    console.log('GET /users/:id/eligibility');
    User.findById(req.params.id, {
      include: [Location]
    }).then((user) => {
      if (!user) {
        res.sendStatus(404);
      } else {
        //  TODO use primary location
        const eligibilityService = new EligibilityService(user, user.Locations[0]);
        eligibilityService.getEligibility().then((eligibility) => {
          res.json(eligibility);
        }).catch((error) => {
          res.send(400, error);
        });
      }
    });
  }
}

module.exports = EligibilityController;
