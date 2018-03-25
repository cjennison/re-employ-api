class HealthCheckJob {
  constructor(job, done) {
    this.job = job;
    this.done = done;
  }

  process() {
    console.log('Health Check is Positive');
    this.done();
  }
}

module.exports = HealthCheckJob;
