const {
  JobOpeningShortUrl,
  JobApplicationRecord,
  JobOpening,
  User
} = require('../db/models');
const BaseController = require('./base');

class ApplyController extends BaseController {
  constructor(app) {
    super(app);

    app.get('/apply/:hash', (...args) => {
      this.redirectToApplicationUrl(...args);
    });
  }

  redirectToApplicationUrl(req, res) {
    JobOpeningShortUrl.findOne({
      where: {
        hash: req.params.hash
      },
      include: [JobOpening, User]
    }).then((shortUrl) => {
      if (shortUrl) {
        this.getCurrentApplication(shortUrl).then((application) => {
          if (!application) {
            JobApplicationRecord.create({
              didApply: false
            }).then((jobApplicationRecord) => {
              shortUrl.addJobApplicationRecord(jobApplicationRecord);
              shortUrl.User.addJobApplicationRecord(jobApplicationRecord);
              shortUrl.JobOpening.addJobApplicationRecord(jobApplicationRecord);
            });
          }
        });

        res.redirect(shortUrl.JobOpening.applicationUrl);
      } else {
        res.sendStatus(404);
      }
    });
  }

  getCurrentApplication(shortUrl) {
    return JobApplicationRecord.findOne({
      where: {
        jobOpeningShortUrlId: shortUrl.id
      }
    });
  }
}

module.exports = ApplyController;
