module.exports = (sequelize) => {
  const JobOpeningOptOut = sequelize.define('JobOpeningOptOut');
  JobOpeningOptOut.associate = (models) => {
    JobOpeningOptOut.belongsTo(models.User);
    JobOpeningOptOut.belongsTo(models.JobOpening);
  };
  return JobOpeningOptOut;
};
