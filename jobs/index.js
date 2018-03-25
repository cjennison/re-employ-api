const HealthCheckJob = require('./health-check-job');
const HealthCheckJobCreator = require('./health-check-job-creator');

const OpenPositionSearchJob = require('./open-position-search-job');
const OpenPositionSearchJobCreator = require('./open-position-search-job-creator');

const UserJobOpeningDailyDispatcherJob = require('./emailer/user-job-opening-daily-dispatcher-job');
const UserJobOpeningDailyDispatcherJobCreator = require('./emailer/user-job-opening-daily-dispatcher-job-creator');
const UserJobOpeningDailyEmailerJob = require('./emailer/user-job-opening-daily-emailer-job');


module.exports = {
  processors: {
    HealthCheckJob,
    OpenPositionSearchJob,
    UserJobOpeningDailyDispatcherJob,
    UserJobOpeningDailyEmailerJob
  },
  creators: {
    HealthCheckJobCreator,
    OpenPositionSearchJobCreator,
    UserJobOpeningDailyDispatcherJobCreator
  }
};
