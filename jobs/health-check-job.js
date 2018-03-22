class HealthCheckJob {
  constructor(job, done) {
    this.job = job;
    this.done = done;
  }

  process() {
    console.log('Job is alive!');
    this.done();
  }
}

module.exports = HealthCheckJob;
