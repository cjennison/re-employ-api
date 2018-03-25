class UserJobOpeningDailyDispatcherJobCreator {
  constructor(queue) {
    this.queue = queue;
  }

  createJob() {
    this.queue.create('user-job-opening-daily-dipatcher')
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

module.exports = UserJobOpeningDailyDispatcherJobCreator;
