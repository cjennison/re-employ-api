const kue = require('kue');
const jobs = require('./index');

let redisConfig;
if (process.env.NODE_ENV === 'production') {
  redisConfig = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      auth: process.env.REDIS_PASS
    }
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

    cb();
  }
}

module.exports = new JobQueue();
