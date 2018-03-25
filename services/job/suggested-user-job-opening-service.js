const { JobOpening } = require('../../db/models');

const SUGGESTED_JOB_LIMIT = 3;

class SuggestedUserJobOpeningService {
  constructor(user) {
    this.user = user;
    this.jobs = user.Jobs;

    if (!this.jobs) {
      throw new Error('User.Jobs are Required');
    }
  }

  async findJobs() {
    console.log('Finding Job Openings for User', this.user.id);

    //TODO  Check for opt outs
    return JobOpening.findAll({
      where: {
        jobId: this.jobs.map(job => job.id),
      },
      order: [
        ['postedDate', 'DESC']
      ],
      limit: SUGGESTED_JOB_LIMIT
    }).then(jobOpenings => jobOpenings);
  }
}

module.exports = SuggestedUserJobOpeningService;
