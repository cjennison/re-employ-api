class OpenPositionSearchJobCreator {
  constructor(queue) {
    this.queue = queue;
  }

  createJob() {
    this.queue.create('search-job-positions', { jobId: 1 })
      .priority('low')
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

module.exports = OpenPositionSearchJobCreator;
