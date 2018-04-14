const kue = require('kue-scheduler');
const jobs = require('./index');

let redisConfig;
if (process.env.NODE_ENV === 'production') {
  redisConfig = {
    redis: process.env.REDIS_URL
  };
} else {
  redisConfig = {};
}

const STUCKJOBTIME = 6000;

class JobQueue {
  constructor() {
    this.queue = kue.createQueue(redisConfig);

    //  Guard against stalled jobs
    this.queue.watchStuckJobs(STUCKJOBTIME);

    this.queue.on('ready', () => {
      console.log('Queue is ready');
    });

    this.queue.on('error', (error) => {
      console.log('There was an error in the main queue!');
      console.log(error);
      console.log(error.stack);
    });
  }

  getQueue() {
    return this.queue;
  }

  listen(cb) {
    console.log('Queue Listening to jobs');

    this.queue.process('health-check', 1, (job, done) => new jobs.processors.HealthCheckJob(job, done).process());
    this.queue.process('search-job-positions', 1, (job, done) => new jobs.processors.OpenPositionSearchJob(job, done).process());
    this.queue.process('search-job-positions-dispatcher', 1, (job, done) => new jobs.processors.OpenPositionSearchJobDispatcherJob(job, done, this.queue).process());
    this.queue.process('user-job-opening-daily-dipatcher', 1, (job, done) => new jobs.processors.UserJobOpeningDailyDispatcherJob(job, done, this.queue).process());
    this.queue.process('user-job-opening-daily-emailer', 1, (job, done) => new jobs.processors.UserJobOpeningDailyEmailerJob(job, done).process());

    cb();
  }
}

module.exports = new JobQueue();
