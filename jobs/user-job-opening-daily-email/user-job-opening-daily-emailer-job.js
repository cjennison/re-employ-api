const _ = require('lodash');
const { User, Job } = require('../../db/models');
const SuggestedUserJobOpeningService = require('../../services/job/suggested-user-job-opening-service');
const SuggestedJobsEmailService = require('../../services/email/suggested-jobs-email-service');
const JobOpeningShortUrlCreator = require('../../services/job/job-opening-short-url-creator');

class UserJobOpeningDailyEmailerJob {
  constructor(job, done) {
    this.job = job;
    this.done = done;
  }

  createShortUrls(user, jobOpenings) {
    const creator = new JobOpeningShortUrlCreator(user, jobOpenings);
    return creator.create();
  }

  process() {
    User.findAll({
      id: this.job.data.userIds,
      include: [Job]
    }).then((usersWithJobs) => {
      _.forEach(usersWithJobs, (user) => {
        const suggestedJobService = new SuggestedUserJobOpeningService(user);
        suggestedJobService.findJobs().then((suggestedJobOpenings) => {
          if (suggestedJobOpenings.length) {
            this.createShortUrls(user, suggestedJobOpenings).then((shortUrls) => {
              new SuggestedJobsEmailService(user, suggestedJobOpenings, shortUrls).execute();
            });
          } else {
            console.log('No job openings to send to user', user.id);
          }
        });
      });

      this.done();
    });
  }
}

module.exports = UserJobOpeningDailyEmailerJob;
