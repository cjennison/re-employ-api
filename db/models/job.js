module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Job.associate = (models) => {
    Job.hasMany(models.JobOpening);
    Job.hasMany(models.UserJob);
    Job.belongsToMany(models.User, { through: 'UserJob' });
  };
  return Job;
};
