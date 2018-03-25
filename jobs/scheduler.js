const _ = require('lodash');
const queue = require('./queue').getQueue();
const jobConfig = require('../kue-schedule.json');

class JobScheduler {
  scheduleDefault() {
    _.forEach(jobConfig, (config) => {
      const job = queue.createJob(config.job)
        .priority(config.priority)
        .attempts(config.attempts)
        .backoff(config.backoff)
        .removeOnComplete(config.removeOnComplete);

      queue.every(config.schedule, job);

      console.log(`[kue-scheduler] scheduled job ${config.job} with schedule: every ${config.schedule}`);
    });
  }

  schedule(job, time) {
    queue.every(time, job);
  }
}

module.exports = new JobScheduler();
