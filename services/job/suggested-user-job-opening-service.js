const {
  JobOpening,
  Location,
  JobOpeningOptOut
} = require('../../db/models');

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

    return JobOpening.findAll({
      where: {
        jobId: this.jobs.map(job => job.id),
        '$JobOpeningOptOuts.id$': null
      },
      include: [
        {
          model: Location,
          required: true
        },
        {
          model: JobOpeningOptOut,
          duplicating: false,
          where: {
            UserId: this.user.id
          },
          required: false
        }
      ],
      order: [
        ['postedDate', 'DESC']
      ],
      limit: SUGGESTED_JOB_LIMIT
    }).then(jobOpenings => jobOpenings);
  }
}

module.exports = SuggestedUserJobOpeningService;
