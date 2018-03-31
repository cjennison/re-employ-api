const { JobOpeningShortUrl, JobOpening } = require('../db/models');
const BaseController = require('./base');

class ApplyController extends BaseController {
  constructor(app) {
    super(app);

    app.get('/apply/:hash', (...args) => {
      this.getApplicationUrl(...args);
    });
  }

  getApplicationUrl(req, res) {
    JobOpeningShortUrl.findOne({
      where: {
        hash: req.params.hash
      },
      include: [JobOpening]
    }).then((shortUrl) => {
      if (shortUrl) {
        res.redirect(shortUrl.JobOpening.applicationUrl);
      } else {
        res.sendStatus(404);
      }
    });
  }
}

module.exports = ApplyController;
