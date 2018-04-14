const { User, UserLocation, Location } = require('../db/models');

const _ = require('lodash');
const BaseController = require('./base');
const EligibilityService = require('../services/eligibility/eligibility-service');

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
      include: [{
        model: UserLocation,
        include: [Location]
      }]
    }).then((user) => {
      if (!user) {
        res.sendStatus(404);
      } else {
        const primaryUserLocation = _.find(user.UserLocations, (userLocation) => {
          return userLocation.primary;
        });

        if (!primaryUserLocation) {
          return this.sendError(res, 400, 'No Primary Location Set', 'user-location-1');
        }

        const eligibilityService = new EligibilityService(user, primaryUserLocation.Location);
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
