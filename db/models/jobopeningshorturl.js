const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const JobOpeningShortUrl = sequelize.define('JobOpeningShortUrl', {
    hash: DataTypes.STRING
  }, {});
  JobOpeningShortUrl.associate = (models) => {
    JobOpeningShortUrl.belongsTo(models.User);
    JobOpeningShortUrl.belongsTo(models.JobOpening);
  };

  JobOpeningShortUrl.generateHash = (userId, jobOpeningId, locationId) => {
    return crypto.createHmac('sha256', `${userId}_${jobOpeningId}_${locationId}`).digest('hex').substring(0, 9);
  };

  return JobOpeningShortUrl;
};
