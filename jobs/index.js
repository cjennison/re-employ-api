const HealthCheckJob = require('./health-check/health-check-job');
const HealthCheckJobCreator = require('./health-check/health-check-job-creator');

const OpenPositionSearchJob = require('./open-position-search/open-position-search-job');
const OpenPositionSearchJobCreator = require('./open-position-search/open-position-search-job-creator');
const OpenPositionSearchJobDispatcherJob = require('./open-position-search/open-position-search-job-dispatcher-job');

const UserJobOpeningDailyDispatcherJob = require('./user-job-opening-daily-email/user-job-opening-daily-dispatcher-job');
const UserJobOpeningDailyDispatcherJobCreator = require('./user-job-opening-daily-email/user-job-opening-daily-dispatcher-job-creator');
const UserJobOpeningDailyEmailerJob = require('./user-job-opening-daily-email/user-job-opening-daily-emailer-job');


module.exports = {
  processors: {
    HealthCheckJob,
    OpenPositionSearchJob,
    UserJobOpeningDailyDispatcherJob,
    UserJobOpeningDailyEmailerJob,
    OpenPositionSearchJobDispatcherJob
  },
  creators: {
    HealthCheckJobCreator,
    OpenPositionSearchJobCreator,
    UserJobOpeningDailyDispatcherJobCreator
  }
};
