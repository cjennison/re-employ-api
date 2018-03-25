class HealthCheckJobCreator {
  constructor(queue) {
    this.queue = queue;
  }

  createJob() {
    this.queue.create('health-check', { apps: ['index'] })
      .priority('critical')
      .attempts(8)
      .backoff(true)
      .removeOnComplete(true)
      .save((err) => {
        if (err) {
          console.log(err);
        }
      });
  }
}

module.exports = HealthCheckJobCreator;
