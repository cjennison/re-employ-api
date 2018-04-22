const { User, Job, Location, JobOpening } = require('../db/models');

const _ = require('lodash');
const BaseController = require('./base');

class JobOpeningController extends BaseController {
  constructor(app) {
    super(app);

    app.get('/users/:id/job_openings', (...args) => {
      this.getUserJobOpenings(...args);
    });
  }

  getUserJobOpenings(req, res) {
    console.log('GET /users/:id/job_openings');

    const userId = req.params.id;
    User.findOne({ where: { id: userId }, include: [Job, Location] }).then((user) => {
      if (!user) {
        return res.sendStatus(404);
      }

      const jobIds = user.Jobs.map(job => job.id);
      const locationIds = user.Locations.map(location => location.id);

      JobOpening.findAll({
        where: {
          JobId: jobIds,
          LocationId: locationIds
        }
      }).then((jobOpenings) => {
        res.send(jobOpenings);
      }).catch(err => this.sendError(res, 500, err));
    }).catch(err => this.sendError(res, 500, err));
  }
}

module.exports = JobOpeningController;
