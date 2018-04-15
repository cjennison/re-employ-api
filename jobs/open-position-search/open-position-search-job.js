const { Job, User, Location } = require('../../db/models');
const { JobSearcher } = require('../../services/job');

class OpenPositionSearchJob {
  constructor(job, done) {
    this.job = job;
    this.done = done;
  }

  process() {
    console.log('Running Job Search', this.job.data);

    Job.findById(this.job.data.jobId, {
      include: [{
        model: User,
        include: [Location]
      }]
    }).then((job) => {
      if (!job) {
        return this.done();
      }
      const searcher = new JobSearcher(job);
      searcher.execute().then((errors) => {
        if (errors && errors.length) {
          return this.done(errors);
        }
        return this.done();
      });
    }).catch((err) => {
      console.log(err);
      this.done(err);
    });
  }
}

module.exports = OpenPositionSearchJob;
