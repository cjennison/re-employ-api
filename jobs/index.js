const HealthCheckJob = require('./health-check-job');
const HealthCheckJobCreator = require('./health-check-job-creator');

module.exports = {
  processors: {
    HealthCheckJob
  },
  creators: {
    HealthCheckJobCreator
  }
};
