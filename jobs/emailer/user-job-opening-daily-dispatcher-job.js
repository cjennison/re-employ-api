const { User } = require('../../db/models');

const BATCH_SIZE = 50;

class UserJobOpeningDailyDispatcherJob {
  constructor(job, done, queue) {
    this.job = job;
    this.done = done;
    this.queue = queue;
  }

  dispatch(offset) {
    User.findAll({ limit: BATCH_SIZE, offset }).then((users) => {
      if (users.length === BATCH_SIZE) {
        this.dispatch(offset + BATCH_SIZE);
      }

      const userIds = users.map(user => user.id);

      this.queue.create('user-job-opening-daily-emailer', { userIds })
        .priority('critical')
        .attempts(8)
        .backoff(true)
        .removeOnComplete(true)
        .save((err) => {
          if (err) {
            console.log(err);
          }
        });

      if (users.length < BATCH_SIZE) {
        this.done();
      }
    });
  }

  process() {
    console.log(`Started user-job-opening-daily-dipatcher at ${new Date()}`)
    this.dispatch(0);
  }
}

module.exports = UserJobOpeningDailyDispatcherJob;
