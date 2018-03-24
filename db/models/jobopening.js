const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const JobOpening = sequelize.define('JobOpening', {
    name: DataTypes.STRING,
    applicationUrl: DataTypes.TEXT,
    description: DataTypes.TEXT,
    company: DataTypes.STRING,
    department: DataTypes.STRING,
    postedDate: DataTypes.DATE,
    scheduleType: DataTypes.STRING,
    hash: DataTypes.STRING,
    channel: DataTypes.STRING
  }, {});

  JobOpening.associate = (models) => {
    JobOpening.belongsTo(models.Job);
    JobOpening.belongsTo(models.Location);
  };

  JobOpening.generateHash = (opening) => {
    const hashId = JSON.stringify({
      name: opening.name,
      company: opening.company,
      department: opening.department,
      scheduleType: opening.scheduleType,
      postedDate: opening.postedDate,
      jobId: opening.jobId,
      locationId: opening.locationId
    });
    return crypto.createHash('sha256').update(hashId).digest('hex');
  };
  return JobOpening;
};
