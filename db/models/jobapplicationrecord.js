module.exports = (sequelize, DataTypes) => {
  const JobApplicationRecord = sequelize.define('JobApplicationRecord', {
    didApply: DataTypes.BOOLEAN
  }, {});
  JobApplicationRecord.associate = (models) => {
    JobApplicationRecord.belongsTo(models.User);
    JobApplicationRecord.belongsTo(models.JobOpening);
    JobApplicationRecord.belongsTo(models.JobOpeningShortUrl);
  };
  return JobApplicationRecord;
};
