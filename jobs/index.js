const HealthCheckJob = require('./health-check-job');
const HealthCheckJobCreator = require('./health-check-job-creator');

const OpenPositionSearchJob = require('./open-position-search-job');
const OpenPositionSearchJobCreator = require('./open-position-search-job-creator');


module.exports = {
  processors: {
    HealthCheckJob,
    OpenPositionSearchJob
  },
  creators: {
    HealthCheckJobCreator,
    OpenPositionSearchJobCreator
  }
};
