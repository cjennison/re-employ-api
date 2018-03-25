const { Job } = require('../../db/models');
const _ = require('lodash');

const BATCH_SIZE = 5;

class OpenPositionSearchJobDispatcherJob {
  constructor(job, done, queue) {
    this.job = job;
    this.done = done;
    this.queue = queue;
  }

  dispatch(offset) {
    Job.findAll({ limit: BATCH_SIZE, offset }).then((jobs) => {
      if (jobs.length === BATCH_SIZE) {
        this.dispatch(offset + BATCH_SIZE);
      }

      const jobIds = jobs.map(job => job.id);

      _.forEach(jobIds, (jobId) => {
        this.queue.create('search-job-positions', { jobId })
          .priority('low')
          .attempts(8)
          .backoff(true)
          .removeOnComplete(true)
          .save((err) => {
            if (err) {
              console.log(err);
            }
          });
      });

      if (jobs.length < BATCH_SIZE) {
        this.done();
      }
    });
  }

  process() {
    console.log(`Started open-position-search-job-dipatcher at ${new Date()}`);
    this.dispatch(0);
  }
}

module.exports = OpenPositionSearchJobDispatcherJob;
